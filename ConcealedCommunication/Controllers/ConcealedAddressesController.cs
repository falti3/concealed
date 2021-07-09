using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConcealedCommunication.Data;
using ConcealedCommunication.Models;
using System.Text;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.NodeServices;
using Jering.Javascript.NodeJS;
using ConcealedCommunication.TransferModels;

namespace ConcealedCommunication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcealedAddressesController : ControllerBase
    {
        private readonly ConcealedCommunicationContext _context;

        private readonly Random _random = new Random();

        private ServerOptions _serverOptions;

        private INodeJSService _nodeJSService;

        private Random _rnd;

        public ConcealedAddressesController(ConcealedCommunicationContext context, INodeJSService nodeJSService)
        {
            _context = context;
            _nodeJSService = nodeJSService;
            _serverOptions = _context.ServerOptions.First();
            _rnd = new Random();
        }

        private string CreateRandomAddress(int length = 5)
        {
            var stringBuilder = new StringBuilder();
            for (var i = 0; i < length; i++)
            {
                var randomNumber = _random.Next(0, 36);
                if (randomNumber < 10)
                {
                    stringBuilder.Append(randomNumber);
                }
                else
                {
                    stringBuilder.Append((char)(randomNumber + 87));
                }
            }
            return stringBuilder.ToString();
        }

        //genutzt!
        [Route("createAddress")]
        [HttpPost]
        public async Task<ActionResult<ConcealedAddress>> CreateConcealedAddress(AddressGenerationObject ago)
        {
            var concealedAddress = new ConcealedAddress
            {
                Address = CreateRandomAddress(),
                ReadKey = ago.readKey,
                WriteKey = ago.writeKey,
                OwnKey = ago.ownKey
            };

            _context.ConcealedAddress.Add(concealedAddress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateConcealedAddress", new { id = concealedAddress.Id }, concealedAddress);
        }

        //genutzt!
        [Route("readMessages")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Object>>> ReadConcealedAddress(MessageObject mo)
        {
            var test = "abc";
            var test2 = Encoding.Unicode.GetBytes(test);

            if (!String.IsNullOrEmpty(mo.ciphertext)) {
                var m1 = new Message();
                m1.ConcealedAddressId = 15;
                m1.Content = Encoding.Unicode.GetBytes(mo.ciphertext);
                m1.IV = mo.iv;
                _context.Message.Add(m1);
                _context.SaveChanges();
            }


            var address = _context.ConcealedAddress.FirstOrDefault(a => a.Address == mo.address);
            if (address != null)
            {
                var key = address.ReadKey;
                if (!String.IsNullOrEmpty(key)) {
                    var ts1 = DateTime.Now;
                    Result result = await _nodeJSService.InvokeFromFileAsync<Result>(
                        "Scripts/VerifySignature.js",
                        args: new object[] {
                        mo.address, mo.timestamp, mo.ciphertext, mo.iv, mo.targetKey, key
                        });

                    var ts2 = DateTime.Now;
                    var rtl = new RunTimeLog();
                    rtl.Milliseconds = (ts2 - ts1).Milliseconds;
                    rtl.Type = "readMessage";
                    _context.RunTimeLog.Add(rtl);
                    _context.SaveChanges();


                    if (result.Message == "true")
                    {
                        var tsR = DateTime.Now;
                        /*random messages:
                        var cnt = _context.Message.Count();
                        var rnd = _rnd.Next(0, cnt);
                        var message = _context.Message.Where(m => m.ConcealedAddress.Address == mo.address).Skip(rnd).Take(1).Select(m => new { Content = Encoding.Unicode.GetString(m.Content), IV = m.IV, Id = m.Id }).ToList();
                        */
                        var message = _context.Message.Where(m => m.ConcealedAddress.Address == mo.address).Take(10).Select(m => new { Content = Encoding.Unicode.GetString(m.Content), IV = m.IV, Id = m.Id }).ToList();

                        var rtl2 = new RunTimeLog();
                        rtl2.Milliseconds = (DateTime.Now - tsR).Milliseconds;
                        rtl2.Type = "readMessageDatabase";
                        _context.RunTimeLog.Add(rtl2);
                        _context.SaveChanges();
                        return message;
                        //return await _context.Message.Where(m => m.ConcealedAddress.Address == mo.address).OrderByDescending(m => m.Id).Take(10).Select(m => new { Content = Encoding.Unicode.GetString(m.Content), IV = m.IV, Id = m.Id }).ToListAsync();
                    }
                }
                else
                {
                    var message = _context.Message.Where(m => m.ConcealedAddress.Address == mo.address).Take(10).Select(m => new { Content = Encoding.Unicode.GetString(m.Content), IV = m.IV, Id = m.Id }).ToList();
                    return message;
                }
            }
            return NoContent();
        }

        //genutzt!
        [Route("writeMessage")]
        [HttpPost]
        public async Task<ActionResult<ConcealedAddress>> WriteToAddress(MessageObject mo)
        {
            var address = _context.ConcealedAddress.FirstOrDefault(a => a.Address == mo.address);
            if (address != null)
            {
                var key = address.WriteKey;

                var ts1 = DateTime.Now;
                Result result = await _nodeJSService.InvokeFromFileAsync<Result>(
                            "Scripts/VerifySignature.js",
                            args: new object[] {
                        mo.address, mo.timestamp, mo.ciphertext, mo.iv, mo.targetKey, key
                            });
                var ts2 = DateTime.Now;
                var rtl = new RunTimeLog();
                rtl.Milliseconds = (ts2 - ts1).Milliseconds;
                rtl.Type = "writeMessage";
                _context.RunTimeLog.Add(rtl);

                if (result.Message == "true")
                {
                    var m = new Message
                    {
                        ConcealedAddress = address,
                        ConcealedAddressId = address.Id,
                        Content = Encoding.Unicode.GetBytes(mo.ciphertext),
                        IV = mo.iv
                    };

                    _context.Message.Add(m);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("WriteToAddress", new { id = m.Id }, m);
                }
            }
            return NoContent();
        }

        //genutzt!
        [Route("deleteMessage")]
        [HttpPost]
        public async Task<ActionResult<ConcealedAddress>> DeleteMessage(DeleteMessageObject dmo)
        {
            var message = _context.Message.FirstOrDefault(m => m.Id == dmo.messageId && m.ConcealedAddress.Address == dmo.address);
            var address = _context.ConcealedAddress.FirstOrDefault(a => a.Address == dmo.address);
            if (message != null && address != null)
            {
                var key = address.OwnKey;

                var ts1 = DateTime.Now;
                Result result = await _nodeJSService.InvokeFromFileAsync<Result>(
                            "Scripts/VerifySignatureDelete.js",
                            args: new object[] {
                        dmo.address, dmo.timestamp, dmo.messageId, dmo.signature, key
                            });
                var ts2 = DateTime.Now;
                var rtl = new RunTimeLog();
                rtl.Milliseconds = (ts2 - ts1).Milliseconds;
                rtl.Type = "deleteMessage";
                _context.RunTimeLog.Add(rtl);


                if (result.Message == "true")
                {
                    _context.Message.Remove(message);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("DeleteMessage", new { id = message.Id }, message);
                }
            }
            return NoContent();
        }

        public class SignatureWithKey
        {
            public string key { get; set; }
            public string signature { get; set; }
        }

    }
}

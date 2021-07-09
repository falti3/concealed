using Org.BouncyCastle.Math;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ConcealedCommunication.Models
{
    public class ServerOptions
    {
        public int Id { get; set; }
        public string EncryptKey { get; set; }
        public string DecryptKey { get; set; }
        public string SignKey { get; set; }
        public string VerifyKey { get; set; }
    }
}

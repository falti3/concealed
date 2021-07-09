using Org.BouncyCastle.Math;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ConcealedCommunication.Models
{
    public class ConcealedAddress
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string ReadKey { get; set; }
        public string WriteKey { get; set; }
        public string OwnKey { get; set; }
     }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConcealedCommunication.Models
{
    public class Message
    {
        public int Id { get; set; }
        public byte[] Content { get; set; }

        public string IV { get; set; }

        public int ConcealedAddressId { get; set; }
        public ConcealedAddress ConcealedAddress { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConcealedCommunication.TransferModels
{
    public class ContentObject
    {
        public string ciphertext { get; set; }
        public string iv { get; set; }

        public ContentObject(string ciphertext, string iv)
        {
            this.ciphertext = ciphertext;
            this.iv = iv;
        }

        public string ToString()
        {
            return "<ciphertext>" + ciphertext + "</ciphertext><iv>" + iv + "</iv>";
        }
    }
}

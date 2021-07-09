using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConcealedCommunication.Models
{
    public class RunTimeLog
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Milliseconds { get; set; }
    }
}

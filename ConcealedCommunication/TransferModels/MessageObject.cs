namespace ConcealedCommunication.Controllers
{
    public class MessageObject
    {
        public string address { get; set; }
        public string timestamp { get; set; }
        public string targetKey { get; set; }
        public string ciphertext { get; set; }
        public string iv { get; set; }

    }
}
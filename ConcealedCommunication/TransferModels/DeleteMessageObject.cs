namespace ConcealedCommunication.Controllers
{
    public class DeleteMessageObject
    {
        public int messageId { get; set; }
        public string timestamp { get; set; }
        public string address { get; set; }
        public string signature { get; set; }
    }
}
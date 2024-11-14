using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs
{
    public class VideoCallDTO
    {

        [JsonPropertyName("token")]
        public string Token { get; set; }
        [JsonPropertyName("channel")]
        public string Channel {  get; set; }

        [JsonPropertyName("caller")]
        public Guid Caller { get; set; }

        [JsonPropertyName("receiver")]
        public Guid Receiver { get; set; }

    }
}

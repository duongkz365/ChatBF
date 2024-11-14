using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs
{
    public class StreamDTO
    {

        [JsonPropertyName("caller")]
        public Guid Caller { get; set; }

        [JsonPropertyName("receiver")]
        public Guid Receiver { get; set; }

        [JsonPropertyName("roomId")]
        public string RoomId { get; set; }
    }
}

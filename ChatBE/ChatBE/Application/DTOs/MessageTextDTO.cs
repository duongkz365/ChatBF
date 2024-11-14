using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class MessageTextDTO
    {

        [JsonPropertyName("token")]
        public string Token { get; set; }
        [JsonPropertyName("receiverId")]
        public string ReceiverId { get; set; }
        [JsonPropertyName("isGroupMessage")]
        public bool IsGroupMessage { get; set; }
        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}


using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs
{
    public class MessageFileDTO
    {
        [JsonPropertyName("token")]
        public string Token { get; set; }
        [JsonPropertyName("receiver")]
        public string Receiver { get; set; }
        [JsonPropertyName("file")]
        public IFormFile File { get; set; }
        [JsonPropertyName("isgroup")]
        public bool IsGroup { get; set; }
    }
}

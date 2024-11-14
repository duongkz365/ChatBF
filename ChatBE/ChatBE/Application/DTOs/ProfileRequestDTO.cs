using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class ProfileRequestDTO
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
    }
}

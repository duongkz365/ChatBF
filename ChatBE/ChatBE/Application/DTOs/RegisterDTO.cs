using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class RegisterDTO
    {
        [JsonPropertyName("userName")]
        public required string UserName { get; set; }

        [JsonPropertyName("email")]
        public required string Email { get; set; }
        [JsonPropertyName("passwordHash")]
        public required string Password { get; set; }
    }
}

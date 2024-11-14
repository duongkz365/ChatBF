using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class LoginDTO
    {
        [JsonPropertyName("username")]
        public required string UserName { get; set; }

        [JsonPropertyName("passwordHash")]
        public required string Password { get; set; }
    }
}

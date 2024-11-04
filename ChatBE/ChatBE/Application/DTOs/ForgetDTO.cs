
using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class ForgetDTO
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }   
    }
}

using System.Text.Json.Serialization;

namespace ChatBE.Application.DTOs
{
    public class ConversationDTO
    {
        [JsonPropertyName("userId")]
        public Guid UserId { get; set; }
        [JsonPropertyName("otherId")]
        public UserDTO OtherUser { get; set; }
    }
}

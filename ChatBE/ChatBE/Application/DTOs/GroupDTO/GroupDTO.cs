
using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs.GroupDTO
{
    public class GroupDTO
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("members")]
        public List<Guid> Members { get; set; }
        [JsonPropertyName("ownerId")]
        public Guid OwnerId { get; set; }
    }
}

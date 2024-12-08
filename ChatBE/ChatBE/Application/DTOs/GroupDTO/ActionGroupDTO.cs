using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs.GroupDTO
{
    public class ActionGroupDTO
    {
        [JsonPropertyName("groupId")]
        public Guid GroupId { get; set; }
        [JsonPropertyName("members")]
        public List<Guid> Members { get; set; }
    }
}

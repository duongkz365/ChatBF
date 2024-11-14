using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs.GroupDTO
{
    public class ActionGroupDTO
    {

        [JsonPropertyName("performer")]
        public Guid Performer { get; set; }
        [JsonPropertyName("affectedPerson")]
        public Guid AffectedPerson{ get; set; }
        [JsonPropertyName("groupId")]
        public Guid GroupId { get; set; }
    }
}

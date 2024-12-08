
using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs.GroupDTO
{
    public class GetGroupByName
    {
        [JsonPropertyName("groupName")]
        public string GroupName { get; set; }
    }
}

using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
namespace ChatBE.Application.DTOs.GroupDTO
{
    public class GetAllGroupDTO
    {

        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("members")]
        public List<Guid> Members { get; set; }
        [JsonPropertyName("groupId")]
        public Guid GroupId { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }

        // Moved FixedMembers inside the Group class
        [BsonIgnore]
        public List<Guid> FixedMembers
        {
            get
            {
                return Members.ConvertAll(member =>
                {
                    try
                    {
                        return Guid.Parse(member.ToString());
                    }
                    catch
                    {
                        return Guid.Empty; // Handle invalid values gracefully
                    }
                });
            }
        }

    }
}

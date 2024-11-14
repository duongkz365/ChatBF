using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ChatBE.Core.Entities
{
    public class Group
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("groupId")]
        public Guid GroupId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("avatar")]
        public string? Avatar { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("members")]
        public List<Guid> Members { get; set; }

        [BsonElement("createdBy")]

        public Guid CreatedBy { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]

        public DateTime UpdatedAt { get; set; }
    }
}

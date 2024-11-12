using MongoDB.Bson.Serialization.Attributes;

namespace ChatBE.Application.DTOs
{
    public class ContactInfo
    {
        [BsonElement("userId")]
        public Guid UserId { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }
    }
}

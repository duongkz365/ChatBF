using ChatBE.Application.DTOs;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ChatBE.Core.Entities
{
    public class Contact
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("userId")]
        public Guid UserId { get; set; }

        [BsonElement("contacts")]
        public List<ContactInfo> Contacts { get; set; } = new List<ContactInfo>();

        [BsonElement("blockedContacts")]
        public List<ContactInfo> BlockedContacts { get; set; } = new List<ContactInfo>();

        [BsonElement("contactRequests")]
        public List<ContactInfo> ContactRequests { get; set; } = new List<ContactInfo>();

        [BsonElement("contactPendings")]
        public List<ContactInfo?> ContactPendings { get; set; } = new List<ContactInfo?>();
    }
}

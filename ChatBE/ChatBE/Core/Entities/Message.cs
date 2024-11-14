using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ChatBE.Core.Entities
{
    public class Message
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("senderId")]
        public Guid SenderId { get; set; }
        [BsonElement("receiverId")]
        public Guid ReceiverId { get; set; }

        [BsonElement("content")]

        public string Content { get; set; }

        [BsonElement("messageType")]
        public required string MessageType { get; set; }

        [BsonElement("mediaUrl")]
        public string? MediaUrl { get; set; }
        [BsonElement("sentAt")]
        public DateTime SentAt { get; set; }

        [BsonElement("readAt")]
        public DateTime? ReadAt { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("isGroupMessage")]
        public bool IsGroupMessage { get; set; }
    }
}

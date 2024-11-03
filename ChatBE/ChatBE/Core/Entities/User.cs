using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatBE.Core.Entities
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [BsonElement("userId")]
        public Guid UserId { get; set; } 

        [BsonElement("userName")]
        public string UserName { get; set; } 

        [BsonElement("email")]
        public string Email { get; set; } 

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; } 

        [BsonElement("fullName")]
        public string FullName { get; set; } 

        [BsonElement("avatarUrl")]
        public string AvatarUrl { get; set; } 

        [BsonElement("bio")]
        public string Bio { get; set; } 

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } 

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } 

        [BsonElement("lastLogin")]
        public DateTime? LastLogin { get; set; } 

        [BsonElement("isActive")]
        public bool IsActive { get; set; } 

        [BsonElement("permission")]
        public required string Permission { get; set; }

    }
}

using MongoDB.Driver;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using Microsoft.Extensions.Configuration;

namespace ChatBE.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("chatAppDB");
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
        public IMongoCollection<Message> Messages => _database.GetCollection<Message>("messages");
        public IMongoCollection<Contact> Contacts => _database.GetCollection<Contact>("contacts");
        public IMongoCollection<Group> Groups => _database.GetCollection<Group>("groups");

    }
}

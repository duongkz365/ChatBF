using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Infrastructure.Data;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class MessageRepository : IMessageRepository
{
    private readonly MongoDbContext _mongoDbContext;

    public MessageRepository(MongoDbContext mongoDbContext)
    {
        _mongoDbContext = mongoDbContext;
    }

    public async Task<IEnumerable<Message>> GetAllMessagesAsync()
    {
        return await _mongoDbContext.Messages.Find(_ => true).ToListAsync();
    }

    public async Task<Message> GetMessageByIdAsync(Guid senderId, Guid receiverId)
    {
        return await _mongoDbContext.Messages
            .Find(message => message.SenderId == senderId && message.ReceiverId == receiverId)
            .FirstOrDefaultAsync();
    }

    public async Task AddMessageAsync(Message message)
    {
        await _mongoDbContext.Messages.InsertOneAsync(message);
    }

    public async Task UpdateMessageAsync(Message message)
    {
        await _mongoDbContext.Messages.ReplaceOneAsync(m => m.Id == message.Id, message);
    }

    public async Task DeleteMessageAsync(Guid senderId, Guid receiverId)
    {
        await  _mongoDbContext.Messages.DeleteOneAsync(message => message.SenderId == senderId && message.ReceiverId == receiverId);
    }
}

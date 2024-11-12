using ChatBE.Core.Entities;

namespace ChatBE.Core.Interfaces
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetAllMessagesAsync();
        Task<Message> GetMessageByIdAsync(Guid senderId, Guid receiverId);
        Task AddMessageAsync(Message message);
        Task UpdateMessageAsync(Message message);
        Task DeleteMessageAsync(Guid senderId, Guid receiverId);
    }
}

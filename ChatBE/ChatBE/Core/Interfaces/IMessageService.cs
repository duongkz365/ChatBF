using ChatBE.Core.Entities;
using ChatBE.Application.DTOs;

namespace ChatBE.Core.Interfaces
{
    public interface IMessageService
    {
        Task<IEnumerable<Message>> GetAllMessagesAsync();
        Task <List<GroupMessageDTO>> GetMessagesAsync (string token);
        Task<Message> GetMessageByIdAsync(Guid senderId, Guid receiverId);

        Task<string> SendText(MessageTextDTO message);
        Task<string> SendFile(MessageFileDTO message);
        Task CreateMessageAsync(Message message);
        Task UpdateMessageAsync(Message message);
        Task DeleteMessageAsync(Guid senderId, Guid receiverId);

        Task<string> ProcessCall(VideoCallDTO call);
        Task<string> AcceptCall(VideoCallDTO call);
        Task<string> CancelCall(VideoCallDTO call);
        Task<string> EndCall(VideoCallDTO call);
    }
}

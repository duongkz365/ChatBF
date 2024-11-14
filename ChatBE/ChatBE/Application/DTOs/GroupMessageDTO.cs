using ChatBE.Core.Entities;
namespace ChatBE.Application.DTOs
{
    public class GroupMessageDTO
    {
        public ConversationDTO Conversation { get; set; }
        public List<Message> Messages { get; set; }
    }
}

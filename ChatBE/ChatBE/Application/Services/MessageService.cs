using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Infrastructure.ExternalServices;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using System.IdentityModel.Tokens.Jwt;

namespace ChatBE.Application.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<NotificationHub> _hubContext;

        public MessageService(IMessageRepository messageRepository, IUserRepository userRepository, IHubContext<NotificationHub> hubContext)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _hubContext = hubContext;
        }

        public Guid DecodeTokenToUserId(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token); // Đọc JWT token
            var claims = jwtToken.Claims.ToDictionary(claim => claim.Type, claim => (object)claim.Value);

            var userId = claims
                .FirstOrDefault(c => c.Key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            return Guid.Parse(userId.Value.ToString());
        }

        public async Task<List<GroupMessageDTO>> GetMessagesAsync(string token)
        {
            var userId = DecodeTokenToUserId((string)token);
            var messages = await _messageRepository.GetAllMessagesAsync();
            var userMessages = messages
             .Where(message => message.SenderId == userId || message.ReceiverId == userId)
             .ToList();

            var alluser = await _userRepository.GetAllAsync();

            var groupedMessages = userMessages
             .GroupBy(message => message.SenderId == userId ? message.ReceiverId : message.SenderId)
             .Select(g =>
             {
                 var otherUserId = g.Key;
                 var otherUser = alluser.FirstOrDefault(u => u.UserId == otherUserId);

                 return new GroupMessageDTO
                 {
                     Conversation = new ConversationDTO
                     {
                         UserId = userId,
                         OtherUser =  new UserDTO
                         {
                             UserId = otherUser.UserId,
                             UserName = otherUser.UserName,
                             Email = otherUser.Email,
                             AvatarUrl = otherUser.AvatarUrl,
                             Bio = otherUser.Bio,
                             CreatedAt = otherUser.CreatedAt,
                             FullName = otherUser.FullName,
                             Permission = otherUser.Permission
                         } 
                     },
                     Messages = g.Select(message => new Message
                     {
                         Id = message.Id,
                         Content = message.Content,
                         MessageType = message.MessageType,
                         MediaUrl = message.MediaUrl,
                         SentAt = message.SentAt.ToUniversalTime(),
                         ReadAt = message.ReadAt?.ToUniversalTime(),
                         Status = message.Status,
                         IsGroupMessage = message.IsGroupMessage,
                         SenderId = message.SenderId,
                         ReceiverId = message.ReceiverId
                     }).ToList()
                 };
             }).ToList();
            return groupedMessages;
        }

        public async Task<IEnumerable<Message>> GetAllMessagesAsync()
        {
            return await _messageRepository.GetAllMessagesAsync();
        }

        public async Task<Message> GetMessageByIdAsync(Guid senderId, Guid receiverId)
        {
            return await _messageRepository.GetMessageByIdAsync(senderId, receiverId);
        }

        public async Task<string> SendText(MessageTextDTO message)
        {
            var senderId = DecodeTokenToUserId(message.Token);

            var newMessage = new Message
            {
                Id = ObjectId.GenerateNewId(),
                SenderId = senderId,
                ReceiverId = Guid.Parse(message.ReceiverId),
                Content = message.Content,
                MessageType = "text",
                MediaUrl = "",
                SentAt = DateTime.UtcNow,
                ReadAt = DateTime.UtcNow,
                Status = "sent",
                IsGroupMessage = message.IsGroupMessage,
            };

            try
            {
                await _messageRepository.AddMessageAsync(newMessage);
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.Content);
                return "SEND MESSAGE SUCCESS!";
            }
            catch (Exception ex) {

                return "SEND MESSAGE FAIL!";
            }
        }


         public async Task<string> SendFile(MessageFileDTO message)
        {

            if (message.File == null || message.File.Length == 0)
                return "FILE REQUEST!!!";

            var imageMimeTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/bmp", "image/tiff" };

            // Kiểm tra loại file
            var isImage = imageMimeTypes.Contains(message.File.ContentType.ToLower());
            // Tạo thư mục nếu chưa tồn tại
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Tạo tên file duy nhất
            var fileName = $"{Guid.NewGuid()}_{message.File.FileName}";
            var filePath = Path.Combine(uploadsFolder, fileName);
            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await message.File.CopyToAsync(stream);
            }
            // Tạo URL để truy cập file
            var fileUrl = "https://localhost:7098/uploads/" + fileName;

            var newMessage = new Message
            {
                Id = ObjectId.GenerateNewId(),
                SenderId = DecodeTokenToUserId(message.Token.ToString()),
                ReceiverId = Guid.Parse(message.Receiver),
                Content = "",
                MessageType = isImage ? "image" : "file",
                MediaUrl = fileUrl,
                SentAt = DateTime.UtcNow,
                ReadAt = null,
                Status = "sent",
                IsGroupMessage = message.IsGroup
            };
            try
            {
                await _messageRepository.AddMessageAsync(newMessage);
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", newMessage.Content);
                return "MESSAGE SEND SUCCESSFULLY!";
            }
            catch (Exception ex)
            {
                return "MESSAGE SEND FAIL!";
            }
        }

        public async Task CreateMessageAsync(Message message)
        {

            await _messageRepository.AddMessageAsync(message);
        }

        public async Task UpdateMessageAsync(Message message)
        {
            await _messageRepository.UpdateMessageAsync(message);
        }

        public async Task DeleteMessageAsync(Guid senderId, Guid receiverId)
        {
            await _messageRepository.DeleteMessageAsync(senderId, receiverId);
        }


    }
}

using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace ChatBE.Infrastructure.ExternalServices
{
    public class NotificationHub : Hub
    {
        private static ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();
        private static ConcurrentDictionary<string, List<string>> _userConnections = new ConcurrentDictionary<string, List<string>>();
        public override Task OnConnectedAsync()
        {

            Console.WriteLine($"Client với Connection ID: {Context.ConnectionId} đã kết nối.");
            // Không cần lưu connectionId tại đây, sẽ được lưu khi userId được gửi
            return base.OnConnectedAsync();
        }

        // Phương thức mới để lưu userId
        public Task StoreUserId(string userId)
        {
            var connectionId = Context.ConnectionId;

            // Nếu userId đã có trong từ điển, thêm connectionId vào danh sách
            if (_userConnections.ContainsKey(userId))
            {
                _userConnections[userId].Add(connectionId);
            }
            else
            {
                // Nếu userId chưa có, tạo danh sách mới cho connectionId
                _userConnections[userId] = new List<string> { connectionId };
            }

            Console.WriteLine($"User ID {userId} đã được lưu với Connection ID: {connectionId}");
            return Task.CompletedTask;
        }

        public List<string> GetConnectionIdsByUserId(string userId)
        {
            // Kiểm tra nếu userId tồn tại trong từ điển và trả về danh sách
            if (_userConnections.TryGetValue(userId, out var connectionIds))
            {
                return connectionIds;
            }

            // Trả về danh sách rỗng nếu userId không tồn tại
            return new List<string>();
        }

        // Ví dụ lấy userId dựa trên connectionId
        public string GetUserId(string connectionId)
        {
            _connections.TryGetValue(connectionId, out string userId);
            return userId;
        }

        // Xóa connectionId khi client ngắt kết nối
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;

            // Tìm và xóa connectionId khỏi từ điển
            foreach (var entry in _userConnections)
            {
                if (entry.Value.Contains(connectionId))
                {
                    entry.Value.Remove(connectionId);
                    if (entry.Value.Count == 0)
                    {
                        _userConnections.TryRemove(entry.Key, out _);
                    }
                    break;
                }
            }

            Console.WriteLine($"Connection ID {connectionId} đã ngắt kết nối và được xóa khỏi danh sách kết nối.");
            return base.OnDisconnectedAsync(exception);
        }


        public async Task SendMessage(string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId}: {message}");

        }

        //public async Task SendMessageToClient(string connectionId, string user, string message)
        //{
        //    await Clients.Client(connectionId).SendAsync("ReceiveMessage", user, message);
        //}


        public Task<string> GetConnectionId()
        {
            return Task.FromResult(Context.ConnectionId);
        }



    }
}

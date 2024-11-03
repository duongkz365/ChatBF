using Microsoft.AspNetCore.SignalR;

namespace ChatBE.Infrastructure.ExternalServices
{
    public class NotificationHub : Hub
    {
        public async Task OnConnectedAsync(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");

        }
        public async Task SendMessage(string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId}: {message}");

        }
    }
}

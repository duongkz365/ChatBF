using Microsoft.AspNetCore.SignalR;

namespace ChatBE.Infrastructure.ExternalServices
{
    public class CallHub : Hub
    {
        private static readonly Dictionary<string, string> userConnections = new();
        public async Task InitiateCall(string userId)
        {
            var callerId = Context.ConnectionId;

            // Store the connection for the caller
            userConnections[callerId] = callerId;

            // Send an IncomingCall event to the specified user
            await Clients.Client(userId).SendAsync("IncomingCall", callerId);
        }

        public async Task AcceptCall(string callerId)
        {
            // Logic to accept call, e.g., notify caller
            await Clients.Client(callerId).SendAsync("CallAccepted", Context.ConnectionId);
        }
    }
}

using ChatBE.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChatBE.Application.DTOs;

namespace ChatBE.Core.Interfaces
{
    public interface IContactService
    {

        //Task<IEnumerable<Contact>> GetAllContactsAsync();
        Task<Contact> GetContactsAsync(string token);
        Task<string> Invite(string token, string userName);
        Task<string> Accept(string receiverId, string senderId);
        Task<string> Refuse(string receiverId, string senderId);
        Task<string> Cancel(string senderId, string receiverId);

        Task<string> Delete(string user1, string user2);



        //Task<List<Guid>> GetBlockedContactsAsync(Guid userId);
        //Task<List<Guid>> GetContactRequestsAsync(Guid userId);
        //Task AddContactAsync(Guid userId, Guid contactId);
        //Task AddEmptyContactAsync(Contact contact);

        //Task RemoveContactAsync(Guid userId, Guid contactId);
        //Task BlockContactAsync(Guid userId, Guid contactId);
        //Task UnblockContactAsync(Guid userId, Guid contactId);
        //Task AddContactRequestAsync(Guid userId, Guid contactId);
        //Task RemoveContactRequestAsync(Guid userId, Guid contactId);
    }
}

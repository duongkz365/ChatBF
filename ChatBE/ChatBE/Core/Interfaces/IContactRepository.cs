using ChatBE.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatBE.Core.Interfaces
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllAsync();
        Task<Contact> GetByIdAsync(Guid userId);
        Task AddAsync(Contact contact);
        Task UpdateAsync(Contact contact);
        Task DeleteAsync(Guid userId);
    }


}

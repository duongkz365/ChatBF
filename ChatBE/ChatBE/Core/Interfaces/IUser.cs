// IUserRepository.cs
using ChatBE.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> GetByIdAsync(Guid id);
    Task<User> GetByUserNameAsync(string userName);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(string id);
    Task<User> GetByCredentialsAsync(string userName, string passwordHash);
    Task<List<User>> GetUsers(List<Guid> userIds);
}

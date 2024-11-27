// IUserRepository.cs
using ChatBE.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> GetByIdAsync(Guid id);
    Task<User> GetByUserNameAsync(string userName);
    Task<User> GetByEmailAsync(string email);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(string id);
    Task<User> GetByCredentialsAsync(string userName, string passwordHash);
    Task<User> GetByCredentialEmailAsync(string email, string passwordHash);
    Task<List<User>> GetUsers(List<Guid> userIds);
    Task DeleteAsync(Guid userId);
    Task<int> GetUserCountAsync();  // Add this method to get user count
}

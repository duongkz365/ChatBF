// UserRepository.cs
using ChatBE.Core.Entities;
using ChatBE.Infrastructure.Data;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class UserRepository : IUserRepository
{
    private readonly MongoDbContext _context;

    public UserRepository(MongoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.Find(_ => true).ToListAsync();
    }

    public async Task<User> GetByIdAsync(Guid id)
    {
        // Tìm người dùng trong cơ sở dữ liệu bằng Guid
        return await _context.Users.Find(user => user.UserId == id).FirstOrDefaultAsync();
    }

    public async Task<User> GetByUserNameAsync(string userName)
    {
   
        return await _context.Users.Find(user => user.UserName == userName).FirstOrDefaultAsync();
    }


    public async Task AddAsync(User user)
    {
        await _context.Users.InsertOneAsync(user);
    }

    public async Task UpdateAsync(User user)
    {
        await _context.Users.ReplaceOneAsync(u => u.Id == user.Id, user);
    }

    public async Task DeleteAsync(string id)
    {
        await _context.Users.DeleteOneAsync(user => user.Id == ObjectId.Parse(id));
    }

    public async Task<User> GetByCredentialsAsync(string userName, string passwordHash)
    {
        return await _context.Users
            .Find(user => user.UserName == userName && user.PasswordHash == passwordHash)
            .FirstOrDefaultAsync();
    }

    public async Task<List<User>> GetUsers(List<Guid> userIds)
    {
        return await _context.Users.Find(u => userIds.Contains(u.UserId)).ToListAsync();
    }
}

// IUserService.cs
using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserService
{
    Task<User> GetUserByIdAsync(Guid id);
    Task<User> GetUserByNameAsync(string name);
    Task<UserDTO> GetOtherProfile(ProfileRequestDTO profile);
    Task<string> Login([FromBody] LoginDTO login);
    Task<string> Register([FromBody] RegisterDTO register);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> GetProfile(string token);
    Task<List<User>> GetUsers(List<Guid> userIds);
    Task<string> Update(User user);

}

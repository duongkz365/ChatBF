// UserService.cs
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    private string _secretKey = "your_super_secret_key_1234567890!@#$%^&*";

    public Guid DecodeTokenToUserId(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token); // Đọc JWT token
        var claims = jwtToken.Claims.ToDictionary(claim => claim.Type, claim => (object)claim.Value);

        var userId = claims
            .FirstOrDefault(c => c.Key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
        return Guid.Parse(userId.Value.ToString());
    }
    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName), // Tên người dùng
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Chuyển đổi Guid thành chuỗi
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()) // ID người dùng
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)); // Thay thế bằng secret key của bạn
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7266",
            audience: "http://localhost:3000 ",
            claims: claims,
            expires: DateTime.Now.AddMinutes(4320),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<User> GetUserByIdAsync(Guid userId)
    {
        return await _userRepository.GetByIdAsync(userId);
    }

    public async Task<string> Login([FromBody] LoginDTO login)
    {
        var user = await _userRepository.GetByCredentialsAsync(login.UserName, login.Password)
                   ?? await _userRepository.GetByCredentialEmailAsync(login.UserName, login.Password);
        return user == null ? "" : GenerateJwtToken(user);
    }

    public async Task<User> GetProfile(string token)
    {
        Guid userId = DecodeTokenToUserId(token);
        var user = await _userRepository.GetByIdAsync(userId);
        return user;
    }
    public async Task<UserDTO> GetOtherProfile(ProfileRequestDTO profile)
    {
       var user =  await _userRepository.GetByIdAsync(Guid.Parse(profile.Id));
        var userDTO = new UserDTO
        {
            UserId = user.UserId,
            UserName = user.UserName,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            Bio = user.Bio,
            CreatedAt = user.CreatedAt,
            FullName = user.FullName,
            Permission = user.Permission
        };
        return userDTO;
    }

    public async Task<string> Register([FromBody] RegisterDTO register)
    {
        var users = await _userRepository.GetAllAsync();
        bool emailExists = users.Any(user => user.Email == register.Email);
        bool userNameExists = users.Any(user => user.UserName == register.UserName);

        if (emailExists)
        {
            return "EMAIL ALREADY EXISTS!";
        }
        else if (userNameExists)
        {
            return "USERNAME ALREADY EXISTS!";
        }
        else
        {
            try
            {
                var newUser = new User
                {
                    Id = MongoDB.Bson.ObjectId.GenerateNewId(),
                    UserId = Guid.NewGuid(),
                    UserName = register.UserName,
                    Email = register.Email,
                    PasswordHash = register.Password,
                    FullName = register.Email,
                    AvatarUrl = "https://localhost:7266/uploads/avt01.jpg",
                    Bio = "This is my bio",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true,
                    Permission = "user"
                };
                await _userRepository.AddAsync(newUser);
                return "USER REGISTERED SUCCESSFULLY!";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }

    public async Task<List<User>> GetUsers(List<Guid> userIds)
    {
        return await _userRepository.GetUsers(userIds);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }


    public async Task<User> GetUserByNameAsync(string name)
    {
        return await _userRepository.GetByUserNameAsync(name);
    }

    public async Task<string> Update(User user)
    {
        var userUpdate = await _userRepository.GetByIdAsync(user.UserId);
        if (userUpdate == null)
        {
            return "FAIL";
        }

        if (!string.IsNullOrEmpty(user.PasswordHash))
        {
            userUpdate.PasswordHash = user.PasswordHash;
        }

        if (!string.IsNullOrEmpty(user.FullName))
        {
            userUpdate.FullName = user.FullName;
        }
        if (!string.IsNullOrEmpty(user.UserName))
        {
            userUpdate.UserName = user.UserName;
        }

        try
        {
            await _userRepository.UpdateAsync(userUpdate);
            return "SUCCESS";
        }catch(Exception e)
        {
            return "FAIL";
        }
    }
    public async Task<bool> SetUserActiveStatusAsync(Guid userId, bool isActive)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null) return false;

        user.IsActive = isActive;
        try
        {
            await _userRepository.UpdateAsync(user);
            return true;
        }
        catch
        {
            return false;
        }
    }
    public async Task<bool> DeleteUserByIdAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            return false;
        }
        try
        {
            // Now passing Guid to the DeleteAsync method
            await _userRepository.DeleteAsync(userId);
            return true;
        }
        catch
        {
            return false;
        }
    }
    public async Task<string> UpdateUserAsync(User user)
    {
        try
        {
            // Update the user in the database
            var existingUser = await _userRepository.GetByIdAsync(user.UserId);
            if (existingUser == null)
            {
                return "FAIL";  // User not found
            }

            // Update fields (add any logic to update specific fields)
            existingUser.UserName = user.UserName;
            existingUser.PasswordHash = user.PasswordHash;
            existingUser.FullName = user.FullName;
            // Add other fields as necessary

            await _userRepository.UpdateAsync(existingUser);
            return "SUCCESS";
        }
        catch
        {
            return "FAIL";  // Handle any errors during update
        }
    
}
    public async Task<int> GetUserCountAsync()
    {
        return await _userRepository.GetUserCountAsync();
    }
}

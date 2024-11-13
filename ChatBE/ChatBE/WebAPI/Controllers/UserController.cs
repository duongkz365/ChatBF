// UserController.cs
using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMailService _mailService;

    public UserController(IUserService userService, IMailService mailService)
    {
        _userService = userService;
        _mailService = mailService;
    }

    [HttpGet]
    public async Task<ActionResult> GetProfile()
    {
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var user = await _userService.GetProfile(token);
        return Ok(user);
    }

    [HttpPost("profile")]
    public async Task<IActionResult> GetProfileById([FromBody] ProfileRequestDTO profile)
    {
        var user = await _userService.GetOtherProfile(profile);
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> Login([FromBody] LoginDTO login)
    {
        var token = await _userService.Login(login);
        if (token == null)
        {
            return Unauthorized();
        }
        return Ok(new {token});
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDTO register)
    {
        var message = await _userService.Register(register);

        return Ok(new {message});
    }

    [HttpPost("forget")]
    public async Task<IActionResult> Forget([FromBody] ForgetDTO forget)
    {
        var message = await _mailService.SendEmaiForgetPasswordlAsync(forget);
        return Ok(new { message});
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] User user)
    {
        var message = await _userService.Update(user);
        return Ok(new { message });
    }

    [HttpPost("upload-avatar")]
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Không có file được tải lên");
        }

        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "profile-pictures");
        if (!Directory.Exists(uploadPath))
        {
            Directory.CreateDirectory(uploadPath);
        }

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadPath, fileName);

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var user = await _userService.GetProfile(token);

            user.AvatarUrl = filePath; // Cập nhật URL ảnh đại diện mới
            var message = await _userService.Update(user);

            return Ok(new { message = "Ảnh đại diện đã được cập nhật thành công!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Lỗi khi tải file lên: {ex.Message}" });
        }
    }

}

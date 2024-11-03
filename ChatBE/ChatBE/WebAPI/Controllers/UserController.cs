// UserController.cs
using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
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
}

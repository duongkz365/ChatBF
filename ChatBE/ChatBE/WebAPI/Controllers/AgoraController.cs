// UserController.cs
using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System;
using System.Text;
using System.Security.Cryptography;
using ChatBE.Core.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class AgoraController : ControllerBase
{

    private readonly IMessageService _messageService;

    public AgoraController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    public async Task<IActionResult> VideoCall([FromBody] VideoCallDTO call)
    {

        var message = _messageService.ProcessCall(call);
        return Ok(new {message}); 
    }

    [HttpPost("accept")]

    public async Task<IActionResult> AcceptCall([FromBody] VideoCallDTO call)
    {
        var message = await _messageService.AcceptCall(call);
        return Ok(new {message});
    }


    [HttpPost("cancel")]
    public async Task<IActionResult> CancelCall([FromBody] VideoCallDTO call)
    {
        var message = await _messageService.CancelCall(call);
        return Ok(new {message});
    }

    [HttpPost("end")]
    public async Task<IActionResult> EndCall([FromBody] VideoCallDTO call)
    {
        var message = await _messageService.EndCall(call);
        return Ok(new { message });
    }


}

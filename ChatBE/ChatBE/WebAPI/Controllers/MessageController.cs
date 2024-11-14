using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChatBE.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageByToken()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            return Ok(await _messageService.GetMessagesAsync(token));
        }


        [HttpPost("sendtext")]

        public async Task<IActionResult> SendText([FromBody] MessageTextDTO message)
        {
            return Ok(await _messageService.SendText(message));
        }


        [HttpPost("sendfile")]
        public async Task<IActionResult> SendFile([FromForm] MessageFileDTO message)
        {
            return Ok(await _messageService.SendFile(message));
        }



    }
}

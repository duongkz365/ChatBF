using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

namespace ChatBE.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var contact = await _contactService.GetContactsAsync(token);

            if (contact == null)
            {
                return BadRequest(new { message = "Bbad" });
            }
            return Ok(new { contact });
        }

        [HttpPost("invite")]
        public async Task<IActionResult> InviteContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var userName = Request.Headers["userName"].ToString();
            var message = await _contactService.Invite(token, userName);
            return Ok(new {message});
        }

        [HttpPost("cancel")]
        public async Task<IActionResult> CancelContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var userName = Request.Headers["userId"].ToString();
            var message = await _contactService.Cancel( token, userName);
            return Ok(new {message});
        }


        [HttpPost("accept")]
        public async Task<IActionResult> AccecptContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var userId = Request.Headers["userId"].ToString();
            var message = await _contactService.Accept(token, userId);
            return Ok(new {message});
        }


        [HttpPost("refuse")]
        public async Task<IActionResult> RefuseContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var userId = Request.Headers["userId"].ToString();
            var message = await _contactService.Refuse(token, userId);
            return Ok(new {message});
        }

        [HttpPost("delete")]

        public async Task<IActionResult> DeleteContact()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var userId = Request.Headers["userId"].ToString();
            var message = await _contactService.Delete(token, userId);
            return Ok(new {message});
        }

    }
}

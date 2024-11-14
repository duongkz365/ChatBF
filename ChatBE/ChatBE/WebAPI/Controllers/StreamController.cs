using ChatBE.Application.DTOs;
using ChatBE.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

namespace ChatBE.WebAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StreamController : Controller
    {


        private readonly IMessageService _messageService;
        public StreamController(IMessageService messageService) { 
              _messageService = messageService;
        }

        //[HttpPost]
        //public async Task<IActionResult> VideoCall([FromBody] VideoCallDTO call)
        //{

        //    var message = _messageService.ProcessCall(call);
        //    return Ok(new { message });
        //}


        [HttpPost("startvideocall")]
        public async Task<IActionResult> StartVideoCall([FromBody] StreamDTO stream)
        {
            var message = await _messageService.StartVideoCall(stream);

            return Ok(new { message });
        }

        [HttpPost("cancelvideocall")]
        public async Task<IActionResult> CancelVideoCall([FromBody] StreamDTO stream)
        {
            var message = await _messageService.CancelVideoCall(stream);
            return Ok(new { message });
        }
        [HttpPost("acceptvideocall")]
        public async Task<IActionResult> AcceptVideoCall([FromBody] StreamDTO stream)
        {
            var message = await _messageService.AcceptVideoCall(stream);
            return Ok(new { message });
        }
        [HttpPost("refusevideocall")]
        public async Task<IActionResult> RefuseVideoCall([FromBody] StreamDTO stream)
        {
            var message = await _messageService.RefuseVideoCall(stream);
            return Ok(new { message });
        }

        [HttpPost("endvideocall")]
        public async Task<IActionResult> EndVideoCall([FromBody] StreamDTO stream)
        {
            var message = await _messageService.EndVideoCall(stream);
            return Ok(new { message });
        }

    }
}

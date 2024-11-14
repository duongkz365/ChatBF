using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;
using System.Net.WebSockets;

namespace ChatBE.WebAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;

        public GroupController (IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGroup()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            return Ok(token);
        }

        [HttpPost("create-group")]
        public async Task<IActionResult> CreateGroup([FromBody] GroupDTO group)
        {
            var message = await _groupService.CreateGroup(group);
            return  Ok(new {message});
        }

        [HttpPut("add-user-to-group")]
        public async Task<IActionResult> AddUserToGroup([FromBody] ActionGroupDTO action)
        {
            var message = await _groupService.AddUserToGroup(action);
            return Ok(new {message});
        }
        [HttpPut("remove-user-from-group")]
        public async Task<IActionResult> RemoveUserFromGroup([FromBody] ActionGroupDTO action)
        {
            var message = await _groupService.RemoveUserFromGroup(action);
            return Ok(new { message });
        }


        [HttpPut("rename-group")]
        public async Task<IActionResult> RenameGroup([FromBody] ActionGroupDTO action)
        {
            var message = await _groupService.RenameGroup(action);
            return Ok(new { message });
        }

        [HttpDelete("delete-group")]
        public async Task<IActionResult> DeleteGroup([FromBody] ActionGroupDTO action)
        {
            var message = await _groupService.DeleteGroup(action);
            return Ok(new { message });

        }
    }
}

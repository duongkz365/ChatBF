using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
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
            var message = await _groupService.GetAllGroupAsync();
            return Ok(message);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);

            if (group == null)
            {
                return NotFound(new { Message = "Group not found" });
            }
            return Ok(group);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(Guid id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);

            if (group == null)
            {
                return NotFound(new { Message = "Group not found" });
            }
            return Ok(group);
        }

        [HttpPost("create-group")]
        public async Task<IActionResult> CreateGroup([FromBody] GroupDTO group)
        {
            var message = await _groupService.CreateGroup(group);
            return  Ok(new {message});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddUserToGroup(Guid id, [FromBody] ActionGroupDTO action)
        {
            if (id == Guid.Empty || action == null)
            {
                return BadRequest("Invalid request data.");
            }

            action.GroupId = id;
            var message = await _groupService.AddUserToGroup(action);
            return Ok(new { message });
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
        public async Task<IActionResult> DeleteGroup([FromBody] GetGroupByName request)
        {
            if (string.IsNullOrEmpty(request.GroupName))
            {
                return BadRequest(new { error = "The groupName field is required." });
            }

            var message = await _groupService.DeleteGroupName(request.GroupName);
            return Ok(new { message });
        }
    }
}

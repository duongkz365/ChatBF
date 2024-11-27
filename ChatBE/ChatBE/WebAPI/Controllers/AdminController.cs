using ChatBE.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatBE.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;

        public AdminController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();  // Fetch users from your database
            if (users == null)
            {
                return NotFound(new { message = "No users found." });
            }
            return Ok(users);
        }
        [HttpGet("blocked")]
        public async Task<IActionResult> GetBlockedUsers()
        {
            var allUsers = await _userService.GetAllUsersAsync();
            var blockedUsers = allUsers.Where(u => !u.IsActive).ToList();

            if (!blockedUsers.Any())
            {
                return NotFound(new { message = "No blocked users found." });
            }

            return Ok(blockedUsers);
        }


        [HttpGet("unblocked")]
        public async Task<IActionResult> GetUnblockedUsers()
        {
            var allUsers = await _userService.GetAllUsersAsync();
            var unblockedUsers = allUsers.Where(u => u.IsActive).ToList();

            if (!unblockedUsers.Any())
            {
                return NotFound(new { message = "No unblocked users found." });
            }

            return Ok(unblockedUsers);
        }
        [HttpPut("block/{userId}")]
        public async Task<IActionResult> BlockUser(Guid userId)
        {
            var result = await _userService.SetUserActiveStatusAsync(userId, false);
            if (!result)
            {
                return BadRequest(new { message = "Failed to block user." });
            }
            return Ok(new { message = "User has been blocked successfully." });
        }

        [HttpPut("unblock/{userId}")]
        public async Task<IActionResult> UnblockUser(Guid userId)
        {
            var result = await _userService.SetUserActiveStatusAsync(userId, true);
            if (!result)
            {
                return BadRequest(new { message = "Failed to unblock user." });
            }
            return Ok(new { message = "User has been unblocked successfully." });
        }
        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var result = await _userService.DeleteUserByIdAsync(userId);
            if (!result)
            {
                return BadRequest(new { message = "Failed to delete user." });
            }
            return Ok(new { message = "User has been deleted successfully." });
        }
        // Update User API
        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] User user)
        {
            // Ensure that the userId from URL matches the one in the request body
            if (user.UserId != userId)
            {
                return BadRequest(new { message = "User ID mismatch." });
            }

            // Validate that required fields are not empty
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest(new { message = "UserName or Password cannot be empty." });
            }

            try
            {
                // Call the service layer to update the user
                var result = await _userService.UpdateUserAsync(user);

                // Check the result of the update operation
                if (result == "FAIL")
                {
                    return BadRequest(new { message = "Failed to update user." });
                }

                return Ok(new { message = "User has been updated successfully." });
            }
            catch (Exception ex)
            {
                // Handle any unexpected errors
                return StatusCode(500, new { message = "An error occurred while updating the user.", error = ex.Message });
            }
        }
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetUserCount()
        {
            try
            {
                // Call the service to get the user count
                var userCount = await _userService.GetUserCountAsync();

                // Return the user count as a response
                return Ok(new { count = userCount });
            }
            catch (Exception ex)
            {
                // Handle any unexpected errors
                return StatusCode(500, new { message = "An error occurred while retrieving the user count.", error = ex.Message });
            }
        }
    }

}

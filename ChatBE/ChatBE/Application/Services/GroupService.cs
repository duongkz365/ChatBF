
using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Core.Interfaces.IService;

namespace ChatBE.Application.Services
{
    public class GroupService: IGroupService
    {

        private readonly IGroupRepository _groupRepository;
        public GroupService(IGroupRepository groupRepository) { 
            _groupRepository = groupRepository;
        }
        public async Task<string> CreateGroup(GroupDTO group)
        {
            var newGroup = new Group
            {
                GroupId = Guid.NewGuid(),
                Name = group.Name,
                Avatar = "",
                Description = "This is discription",
                Members = group.Members,
                CreatedBy = group.OwnerId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Status = "active"
            };
            await _groupRepository.AddGroupAsync(newGroup);
            return "ok";
        }


        public async Task<string> AddUserToGroup(ActionGroupDTO action)
        {
            return "ok";
        }
        public async Task<string> RemoveUserFromGroup(ActionGroupDTO action)
        {
            return "ok";
        }
        public async Task<string> RenameGroup(ActionGroupDTO action)
        {
            return "ok";
        }
        public async Task<string> DeleteGroup(ActionGroupDTO action)
        {
            return "ok";
        }
    }
}

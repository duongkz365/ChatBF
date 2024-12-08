
using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Core.Interfaces.IService;

namespace ChatBE.Application.Services
{
    public class GroupService : IGroupService
    {

        private readonly IGroupRepository _groupRepository;
        public GroupService(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }
        public async Task<string> CreateGroup(GroupDTO group)
        {
            var groups = await _groupRepository.GetGroupByNameAsync(group.Name);
            if (groups != null)
            {
                return "Groups Name exsited!";
            }
            var newGroup = new Group
            {
                GroupId = Guid.NewGuid(),
                Name = group.Name,
                Avatar = "",
                Description = group.Description,
                Members = group.Members,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };
            await _groupRepository.AddAsync(newGroup);
            return "ok";
        }


        public async Task<string> AddUserToGroup(ActionGroupDTO action)
        {
            // Validate input
            if (action.GroupId == Guid.Empty || action.Members == null || !action.Members.Any())
            {
                throw new ArgumentException("Invalid group ID or member list.");
            }

            // Call the repository to update the group
            return await _groupRepository.AddMemberAsync(action.GroupId, action.Members);
        }
        public async Task<string> RemoveUserFromGroup(ActionGroupDTO action)
        {

            return "ok";

        }
        public async Task<string> RenameGroup(ActionGroupDTO action)
        {
            return "ok";
        }

        public async Task<List<GetAllGroupDTO>> GetAllGroupAsync()
        {
            var data = await _groupRepository.GetAllGroupsAsync();

            return data.Select(group => new GetAllGroupDTO
            {
                GroupId = group.GroupId,
                Name = group.Name,
                Members = group.Members ?? new List<Guid>(),
                Description = group.Description,
            }).ToList();
        }


        Task<IEnumerable<Group>> IGroupService.GetGroupAsync()
        {
            throw new NotImplementedException();
        }

        public Task<string> DeleteGroup(Guid groupId)
        {
            throw new NotImplementedException();
        }

        public async Task<string> DeleteGroupName(string groupName)
        {
            var groups = await _groupRepository.GetGroupByNameAsync(groupName);
            if (groups == null)
            {
                return "Groups not found!";
            }
            await _groupRepository.RemoveGroupAsync(groups.GroupId);
            return "OPERATION SUCCESSFULLY!";
        }
        public async Task<IEnumerable<Group>> GetGroupByIdAsync(Guid groupId)
        {
            var group = await _groupRepository.GetGroupByIdAsync(groupId);

            return group != null ? new List<Group> { group } : Enumerable.Empty<Group>();
        }

    }
}

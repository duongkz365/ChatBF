using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Entities;

namespace ChatBE.Core.Interfaces
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<Group> GetGroupByIdAsync(Guid groupId);
        Task<Group> GetGroupByNameAsync(string name);
        Task<IEnumerable<Group>> GetGroupByUserIdAsync(Guid userId);
        Task<string> AddMemberAsync(Guid groupId, List<Guid> memberIds); // Updated
        Task<string> RemoveMemberAsync(Guid groupId, Guid userId);
        Task RemoveGroupAsync(Guid groupId);
        Task AddAsync(Group group);


    }
}

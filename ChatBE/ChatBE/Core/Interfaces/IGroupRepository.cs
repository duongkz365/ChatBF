using ChatBE.Core.Entities;

namespace ChatBE.Core.Interfaces
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<Group> GetGroupByIdAsync(Guid groupId);
        Task<IEnumerable<Group>> GetGroupByUserIdAsync(Guid userId);
        Task<string> AddMemberAsync(Guid groupId, Guid userId);
        Task<string> RemoveMemberAsync(Guid groupId, Guid userId);
        Task<string> RemoveGroupAsync(Guid groupId);
        Task<string> AddGroupAsync(Group group);

    }
}

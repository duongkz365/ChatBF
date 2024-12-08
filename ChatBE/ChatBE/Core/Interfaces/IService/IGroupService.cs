using ChatBE.Application.DTOs;
using ChatBE.Application.DTOs.GroupDTO;
using ChatBE.Core.Entities;

namespace ChatBE.Core.Interfaces.IService
{
    public interface IGroupService
    {

        Task<string> CreateGroup(GroupDTO group);
        Task<string> AddUserToGroup(ActionGroupDTO action);
        Task<string> RemoveUserFromGroup(ActionGroupDTO action);
        Task<string> RenameGroup(ActionGroupDTO action);
        Task<string> DeleteGroup(Guid groupId);
        Task<string> DeleteGroupName(string name);
        Task<IEnumerable<Group>> GetGroupByIdAsync(Guid groupId);
        Task<IEnumerable<Group>> GetGroupAsync();
        Task<List<GetAllGroupDTO>> GetAllGroupAsync();

    }
}

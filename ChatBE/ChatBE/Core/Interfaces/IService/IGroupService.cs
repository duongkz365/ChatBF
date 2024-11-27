using ChatBE.Application.DTOs;
using ChatBE.Application.DTOs.GroupDTO;

namespace ChatBE.Core.Interfaces.IService
{
    public interface IGroupService
    {

        Task<string> CreateGroup (GroupDTO group);
        Task<string> AddUserToGroup(ActionGroupDTO action);
        Task<string> RemoveUserFromGroup(ActionGroupDTO action);
        Task<string> RenameGroup(ActionGroupDTO action);
        Task<string> DeleteGroup(ActionGroupDTO action);
        
    }
}

using ChatBE.Core.Entities;

namespace ChatBE.Core.Interfaces
{
    public interface IGroup
    {
        public List<Group> GetListGroupByUserIdActive(Guid userId);
        public string DeleteGroup(Guid groupId, Guid adminId);
        public string InviteGroup(Guid groupId, Guid userInviteId);
        public string DeleteUserFromGroup(Guid groupId, Guid adminId, Guid userId);
        public string CreateGroup(Guid adminId);

    }
}

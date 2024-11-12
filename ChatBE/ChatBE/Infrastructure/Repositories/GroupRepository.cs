using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Infrastructure.Data;

namespace ChatBE.Infrastructure.Repositories
{
    public class GroupRepository : IGroup

    {
        private readonly MongoDbContext _dbContext;
        public GroupRepository(MongoDbContext mongoDbContext) { 
            _dbContext = mongoDbContext;
        }
        public List<Group> GetListGroupByUserIdActive(Guid userId)
        {
            return new List<Group>();
        }
        public string DeleteGroup(Guid groupId, Guid adminId)
        {
            return "notification";
        }
        public string InviteGroup(Guid groupId, Guid userInviteId)
        {
            return "notification";
        }
        public string DeleteUserFromGroup(Guid groupId, Guid adminId, Guid userId)
        {
            return "notification";
        }
        public string CreateGroup(Guid adminId)
        {
            return "notification";
        }
    }
}

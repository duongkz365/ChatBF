namespace ChatBE.Core.Interfaces
{
    public interface IContact
    {
        public Object GetContact(Guid userId);
        public Object AddContact(Guid senderId, Guid receiverId);
        public Object AcceptContact (Guid senderId, Guid receiverId);
        public Object DeleteContact(Guid userId, Guid deleteId);

    }
}

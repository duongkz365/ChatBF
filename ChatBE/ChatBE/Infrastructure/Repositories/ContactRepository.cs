using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using ChatBE.Infrastructure.Data;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatBE.Infrastructure.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly MongoDbContext _contactsCollection;

        public ContactRepository(MongoDbContext mongoDbContext)
        {
            _contactsCollection = mongoDbContext;
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await _contactsCollection.Contacts.Find(_ => true).ToListAsync();
        }

        public async Task<Contact> GetByIdAsync(Guid userId)
        {
            return await _contactsCollection.Contacts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
        }
  

        public async Task AddAsync(Contact contact)
        {
            await _contactsCollection.Contacts.InsertOneAsync(contact);
        }

        public async Task UpdateAsync(Contact contact)
        {
            await _contactsCollection.Contacts.ReplaceOneAsync(c => c.UserId == contact.UserId, contact);
        }

        public async Task DeleteAsync(Guid userId)
        {
            await _contactsCollection.Contacts.DeleteOneAsync(c => c.UserId == userId);
        }
    }


}

using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace ChatBE.Application.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        private readonly IUserService _userService;

        public ContactService(IContactRepository contactRepository, IUserService userService)
        {
            _contactRepository = contactRepository;
            _userService = userService;
        }



        public Guid DecodeTokenToUserId(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token); // Đọc JWT token
            var claims = jwtToken.Claims.ToDictionary(claim => claim.Type, claim => (object)claim.Value);

            var userId = claims
                .FirstOrDefault(c => c.Key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            return Guid.Parse(userId.Value.ToString());
        }


        public async Task<Contact> GetContactsAsync(string token)
        {
            Guid userId = DecodeTokenToUserId(token);
            return await _contactRepository.GetByIdAsync(userId);
        }


        //public async Task<string> Invite(string token, string userName)
        //{
        //    var userId = DecodeTokenToUserId(token);
        //    var userSender = await _userService.GetUserByIdAsync(userId);
        //    var userReceiver = await _userService.GetUserByNameAsync(userName);

        //    if (userReceiver == null)
        //        return "USER DOES NOT EXIST!";

        //    // Lấy contact của cả sender và receiver
        //    var contactSender = await _contactRepository.GetByIdAsync(userId);
        //    var contactReceiver = await _contactRepository.GetByIdAsync(userReceiver.UserId);

        //    // Tạo contact mới nếu chưa có
        //    if (contactReceiver == null)
        //    {
        //        contactReceiver = new Contact
        //        {
        //            UserId = userReceiver.UserId
        //        };
        //        await _contactRepository.AddAsync(contactReceiver);
        //    }

        //    if (contactSender == null)
        //    {
        //        contactSender = new Contact
        //        {
        //            UserId = userId
        //        };
        //        await _contactRepository.AddAsync(contactSender);
        //    }

        //    // Kiểm tra và thêm vào danh sách contactPending và contactRequest
        //    if (!contactSender.ContactPendings.Any(c => c != null && c.UserId == userReceiver.UserId))
        //    {
        //        contactSender.ContactPendings.Add(new ContactInfo
        //        {
        //            UserId = userReceiver.UserId,
        //            UserName = userReceiver.UserName
        //        });
        //    }

        //    if (!contactReceiver.ContactRequests.Any(c => c.UserId == userSender.UserId))
        //    {
        //        contactReceiver.ContactRequests.Add(new ContactInfo
        //        {
        //            UserId = userSender.UserId,
        //            UserName = userSender.UserName
        //        });
        //    }

        //    // Cập nhật lại trong cơ sở dữ liệu
        //    await _contactRepository.UpdateAsync(contactSender);
        //    await _contactRepository.UpdateAsync(contactReceiver);

        //    return "REQUEST SENT SUCCESSFULLY!";
        //}


        public async Task<string> Invite(string token, string userName)
        {
            var userId = DecodeTokenToUserId(token);
            var userSender = await _userService.GetUserByIdAsync(userId);
            var userReceiver = await _userService.GetUserByNameAsync(userName);

            if (userReceiver == null)
                return "USER DOES NOT EXIST!";

            // Lấy contact của cả sender và receiver
            var contactSender = await _contactRepository.GetByIdAsync(userId);
            var contactReceiver = await _contactRepository.GetByIdAsync(userReceiver.UserId);

            // Tạo contact mới nếu chưa có
            if (contactReceiver == null)
            {
                contactReceiver = new Contact
                {
                    UserId = userReceiver.UserId
                };
                await _contactRepository.AddAsync(contactReceiver);
            }

            if (contactSender == null)
            {
                contactSender = new Contact
                {
                    UserId = userId
                };
                await _contactRepository.AddAsync(contactSender);
            }

            // Kiểm tra nếu đã là bạn bè, không gửi lời mời nữa
            bool isAlreadyFriend = contactSender.Contacts.Any(c => c.UserId == userReceiver.UserId) ||
                                   contactReceiver.Contacts.Any(c => c.UserId == userSender.UserId);

            if (isAlreadyFriend)
            {
                return "ALREADY FRIENDS!";
            }

            // Kiểm tra và thêm vào danh sách contactPending và contactRequest
            if (!contactSender.ContactPendings.Any(c => c != null && c.UserId == userReceiver.UserId))
            {
                contactSender.ContactPendings.Add(new ContactInfo
                {
                    UserId = userReceiver.UserId,
                    UserName = userReceiver.UserName
                });
            }

            if (!contactReceiver.ContactRequests.Any(c => c.UserId == userSender.UserId))
            {
                contactReceiver.ContactRequests.Add(new ContactInfo
                {
                    UserId = userSender.UserId,
                    UserName = userSender.UserName
                });
            }

            // Cập nhật lại trong cơ sở dữ liệu
            await _contactRepository.UpdateAsync(contactSender);
            await _contactRepository.UpdateAsync(contactReceiver);

            return "REQUEST SENT SUCCESSFULLY!";
        }


        //public async Task<string> Accept(string user1,string user2)
        //{

        //    var userId1 = DecodeTokenToUserId(user1);
        //    var userId2 = Guid.Parse(user2);
        //    var userSender = await _userService.GetUserByIdAsync(userId1);
        //    var userReceiver = await _userService.GetUserByIdAsync(userId2);


        //    // Kiểm tra nếu không tồn tại một trong hai người dùng
        //    if (userSender == null || userReceiver == null)
        //        return "ONE OR BOTH USERS DO NOT EXIST!";

        //    // Lấy contact của user1 và user2
        //    var contactUser1 = await _contactRepository.GetByIdAsync(userId1);
        //    var contactUser2 = await _contactRepository.GetByIdAsync(userId2);

        //    // Kiểm tra nếu contact của một trong hai người dùng không tồn tại
        //    if (contactUser1 == null || contactUser2 == null)
        //        return "ONE OR BOTH USERS DO NOT HAVE CONTACT RECORDS!";



        //    // Xóa user2 khỏi danh sách contactRequests của user1
        //    contactUser1.ContactRequests.RemoveAll(c => c.UserId == userId2);

        //    // Xóa user1 khỏi danh sách contactPendings của user2
        //    contactUser2.ContactPendings.RemoveAll(c => c.UserId == userId1);

        //    // Thêm user2 vào danh sách contacts của user1
        //    contactUser1.Contacts.Add(new ContactInfo { UserId = userId2, UserName = userReceiver.UserName });

        //    // Thêm user1 vào danh sách contacts của user2
        //    contactUser2.Contacts.Add(new ContactInfo { UserId = userId1, UserName = userSender.UserName });

        //    // Cập nhật contact của user1 và user2 trong database
        //    await _contactRepository.UpdateAsync(contactUser1);

        //    await _contactRepository.UpdateAsync(contactUser2);

        //    return "OPERATION SUCCESSFULLY!";
        //}


        public async Task<string> Accept(string user1, string user2)
        {
            var userId1 = DecodeTokenToUserId(user1);
            var userId2 = Guid.Parse(user2);
            var userSender = await _userService.GetUserByIdAsync(userId1);
            var userReceiver = await _userService.GetUserByIdAsync(userId2);

            // Kiểm tra nếu không tồn tại một trong hai người dùng
            if (userSender == null || userReceiver == null)
                return "ONE OR BOTH USERS DO NOT EXIST!";

            // Lấy contact của user1 và user2
            var contactUser1 = await _contactRepository.GetByIdAsync(userId1);
            var contactUser2 = await _contactRepository.GetByIdAsync(userId2);

            // Kiểm tra nếu contact của một trong hai người dùng không tồn tại
            if (contactUser1 == null || contactUser2 == null)
                return "ONE OR BOTH USERS DO NOT HAVE CONTACT RECORDS!";

            // Xóa user2 khỏi danh sách contactRequests của user1
            contactUser1.ContactRequests.RemoveAll(c => c.UserId == userId2);

            // Xóa user1 khỏi danh sách contactPendings của user2
            contactUser2.ContactPendings.RemoveAll(c => c.UserId == userId1);

            // Kiểm tra nếu user2 đã có trong danh sách contacts của user1
            var isAlreadyFriend1 = contactUser1.Contacts.Any(c => c.UserId == userId2);
            var isAlreadyFriend2 = contactUser2.Contacts.Any(c => c.UserId == userId1);

            // Nếu chưa có thì mới thêm vào danh sách contacts
            if (!isAlreadyFriend1)
            {
                contactUser1.Contacts.Add(new ContactInfo { UserId = userId2, UserName = userReceiver.UserName });
            }

            if (!isAlreadyFriend2)
            {
                contactUser2.Contacts.Add(new ContactInfo { UserId = userId1, UserName = userSender.UserName });
            }

            // Cập nhật contact của user1 và user2 trong database
            await _contactRepository.UpdateAsync(contactUser1);
            await _contactRepository.UpdateAsync(contactUser2);

            return "OPERATION SUCCESSFULLY!";
        }

        public async Task<string> Refuse(string receiver, string sender)
        {

            var receiverId = DecodeTokenToUserId(receiver);
            var senderId = Guid.Parse(sender);


            // Lấy contact của senderId và receiverId từ cơ sở dữ liệu
            var senderContact = await _contactRepository.GetByIdAsync(senderId);
            var receiverContact = await _contactRepository.GetByIdAsync(receiverId);

            // Kiểm tra nếu contact của người gửi không tồn tại
            if (senderContact == null)
            {
                return "Sender contact not found!";
            }

            // Kiểm tra nếu contact của người nhận không tồn tại
            if (receiverContact == null)
            {
                return "Receiver contact not found!";
            }

            // Xóa object có receiverId trong contactPendings của sender
            var pendingToRemove = senderContact.ContactPendings
                .FirstOrDefault(c => c?.UserId == receiverId);
            if (pendingToRemove != null)
            {
                senderContact.ContactPendings.Remove(pendingToRemove);
            }

            // Xóa object có senderId trong contactRequests của receiver
            var requestToRemove = receiverContact.ContactRequests
                .FirstOrDefault(c => c?.UserId == senderId);
            if (requestToRemove != null)
            {
                receiverContact.ContactRequests.Remove(requestToRemove);
            }

            // Cập nhật lại contact của sender và receiver trong cơ sở dữ liệu
            await _contactRepository.UpdateAsync(senderContact);
            await _contactRepository.UpdateAsync(receiverContact);
            return "OPERATION SUCCESSFULLY!";
        }
        public async Task<string> Delete(string user1, string user2)
        {
            var userId1 = DecodeTokenToUserId(user1);
            var userId2 = Guid.Parse(user2);
            var contactUser1 = await _contactRepository.GetByIdAsync(userId1);
            var contactUser2 = await _contactRepository.GetByIdAsync(userId2);
            if (contactUser1 == null)
            {
                return "Contact for User 1 not found!";
            }

            // Kiểm tra nếu contact của user2 không tồn tại
            if (contactUser2 == null)
            {
                return "Contact for User 2 not found!";
            }
            // Xóa user2 trong contacts của user1
            contactUser1.Contacts.RemoveAll(c => c.UserId == userId2);

            // Xóa user1 trong contacts của user2
            contactUser2.Contacts.RemoveAll(c => c.UserId == userId1);

            // Cập nhật lại vào cơ sở dữ liệu
            await _contactRepository.UpdateAsync(contactUser1);
            await _contactRepository.UpdateAsync(contactUser2);
            return "OPERATION SUCCESSFULLY!";
        }

        public async Task<string> Cancel(string sender, string receiver)
        {

            var receiverId =  Guid.Parse(receiver);
            var senderId = DecodeTokenToUserId(sender);


            // Lấy contact của senderId và receiverId từ cơ sở dữ liệu
            var senderContact = await _contactRepository.GetByIdAsync(senderId);
            var receiverContact = await _contactRepository.GetByIdAsync(receiverId);

            // Kiểm tra nếu contact của người gửi không tồn tại
            if (senderContact == null)
            {
                return "Sender contact not found!";
            }

            // Kiểm tra nếu contact của người nhận không tồn tại
            if (receiverContact == null)
            {
                return "Receiver contact not found!";
            }

            // Xóa object có receiverId trong contactPendings của sender
            var pendingToRemove = senderContact.ContactPendings
                .FirstOrDefault(c => c?.UserId == receiverId);
            if (pendingToRemove != null)
            {
                senderContact.ContactPendings.Remove(pendingToRemove);
            }

            // Xóa object có senderId trong contactRequests của receiver
            var requestToRemove = receiverContact.ContactRequests
                .FirstOrDefault(c => c?.UserId == senderId);
            if (requestToRemove != null)
            {
                receiverContact.ContactRequests.Remove(requestToRemove);
            }

            // Cập nhật lại contact của sender và receiver trong cơ sở dữ liệu
            await _contactRepository.UpdateAsync(senderContact);
            await _contactRepository.UpdateAsync(receiverContact);
            return "OPERATION SUCCESSFULLY!";
        }


    }
}
 
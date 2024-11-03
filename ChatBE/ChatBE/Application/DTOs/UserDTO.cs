﻿namespace ChatBE.Application.DTOs
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public string Bio { get; set; }
        public DateTime CreatedAt { get; set; }
        public string FullName { get; set; }
        public string Permission { get; set; }
    }
}

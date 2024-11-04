using ChatBE.Application.DTOs;
using ChatBE.Core.Entities;
using ChatBE.Core.Interfaces.IService;
using MailKit.Net.Smtp;
using MimeKit;
using System.Text;

namespace ChatBE.Application.Services
{
    public class MailService : IMailService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        public MailService(IUserRepository userRepository, IUserService userService)
        {
            _userRepository = userRepository;
            _userService = userService;
        }

        public static string GeneratePassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var random = new Random();
            var password = new StringBuilder();

            for (int i = 0; i < 8; i++)
            {
                password.Append(chars[random.Next(chars.Length)]);
            }

            return password.ToString();
        }
        public async Task<string> SendEmaiForgetPasswordlAsync(ForgetDTO forget)
        {
            var userForget = await _userRepository.GetByEmailAsync(forget.Email);
            if (userForget == null)
            {
                return "FAIL";
            }else
            {
                var newPassword = GeneratePassword();
                
                userForget.PasswordHash = newPassword;

                await _userRepository.UpdateAsync(userForget);

                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress("Support Team", "dinhky0707@gmail.com"));
                emailMessage.To.Add(new MailboxAddress("", forget.Email));
                emailMessage.Subject = "PASSWORD RECOVERY - ACTION REQUIRE_CHATAPP";

                var emailBody = $@"
            <!DOCTYPE html>
            <html lang=""en"">
                <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Password Recovery</title>
                </head>
            <body style=""font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;"">

             <h2 style=""color: #333;"">Password Recovery Request</h2>

               <p>Hi {userForget.UserName},</p>

              <p>We received a request to reset your password for your account associated with this email address: <strong>[{forget.Email}]</strong>.</p>

                 <p>To reset your password, password below:</p>

                 <p style="" color: red"">{newPassword}</p>

                 <p>Thank you,<br>The Dinh Duong Ky Team!</p>
                 <p>Contact Infomation:</p>

                 <p>CEO: DINH DUONG KY</p>
                 <p>MSSV: 3120560050</p>                
                    <p>CLASS: DKP1202</p>
                    <p>Phone: 0398755231</p>
                    <p> REACT - ASP.NET - ONION </p>
                     <footer style=""margin-top: 20px; font-size: 0.8em; color: #777;"">
                    <p>If you have any questions, feel free to contact us at <a href=""mailto:dinhky0707@gmail.com"">dinhky0707@gmail.com</a>.</p>
                <p>© [2024][Ky Dinh Company] . All rights reserved.</p>
         </footer>

            </body>
        </html>
            ";



                emailMessage.Body = new TextPart("html")
                {
                    Text = emailBody
                };

                try
                {

                    using (var client = new SmtpClient())
                    {
                        // Kết nối tới máy chủ SMTP của Gmail
                        await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);

                        // Đăng nhập bằng địa chỉ email và mật khẩu ứng dụng
                        await client.AuthenticateAsync("dinhky0707@gmail.com", "derqgxthkrteuqdx");

                        // Gửi email
                        await client.SendAsync(emailMessage);
                        await client.DisconnectAsync(true);
                    }
                    return "SUCCESS";
                }
                catch (Exception e)
                {
                    return "FAIL";
                }
            }

            

            



           
          
        }
    }
}

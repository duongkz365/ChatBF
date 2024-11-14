using ChatBE.Application.DTOs;

namespace ChatBE.Core.Interfaces.IService
{
    public interface IMailService
    {
        Task<string> SendEmaiForgetPasswordlAsync(ForgetDTO email);
    }
}


using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ChatBE.Infrastructure.Data;
using ChatBE.Infrastructure.ExternalServices;
using ChatBE.Core.Interfaces;
using ChatBE.Core.Entities;
using ChatBE.Infrastructure.Repositories;
using ChatBE.Application.Services;
using ChatBE.Core.Interfaces.IService;




var builder = WebApplication.CreateBuilder(args);


// CONFIGURE JWT BEARER

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:7098", // Đảm bảo rằng giá trị này là đúng
        ValidAudience = "http://localhost:3000",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_super_secret_key_1234567890!@#$%^&*"))
    };
});

builder.Services.AddAuthorization();


// CONFIGURE CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("react",
        builder => builder
            .WithOrigins("http://localhost:3000", "http://192.168.1.35:3000") // FRONTEND DOMAIN
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());  // Cho phép gửi yêu cầu từ địa chỉ cụ thể này
});

// ADD SERVICES TO THE CONTAINER
BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
builder.Services.AddScoped<MongoDbContext>();

// REGISTER USER
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>(); // Đăng ký IUserService


// REGISTER MESSAGE
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IMessageService, MessageService>();

//REGISTER CONTACT

builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

// REGISTER MAIL SERVICES
builder.Services.AddScoped<IMailService, MailService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();






builder.Services.AddSignalR();

var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");

Console.WriteLine("This is connection string: " + mongoConnectionString);

try
{
    var mongoClient = new MongoClient(mongoConnectionString);
    var database = mongoClient.GetDatabase("chatAppDB");

    // Kiểm tra kết nối bằng cách lấy ra tên các collection
    var collections = database.ListCollectionNames().ToList();
    Console.WriteLine("SUCCESSFULLY CONNECTED TO MongoDB. COLLECTION: " + string.Join(", ", collections));
}
catch (Exception e)
{
    Console.WriteLine("CANNOT CONNECT TO MongoDB: ", e.Message);
}


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("react");   // USE CORS

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();  // File

var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
if (!Directory.Exists(uploadsFolderPath))
{
    Directory.CreateDirectory(uploadsFolderPath);
}



app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapHub<NotificationHub>("/chathub");
app.MapHub<CallHub>("/callhub");

app.UseStaticFiles(); // Đảm bảo để ASP.NET phục vụ các tệp tĩnh trong wwwroot


app.Run();


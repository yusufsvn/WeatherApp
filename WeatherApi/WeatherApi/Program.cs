using StackExchange.Redis;
using WeatherApi.Services;

var builder = WebApplication.CreateBuilder(args);
var redisConfiguration = builder.Configuration.GetSection("Redis")["Connection"];
var redis = ConnectionMultiplexer.Connect(redisConfiguration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddSingleton<RedisService>();
builder.Services.AddSingleton<IConnectionMultiplexer>(redis);
builder.Services.AddHttpClient<WeatherService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

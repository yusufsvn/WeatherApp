using StackExchange.Redis;
using System.Diagnostics;
using System.Text.Json;

namespace WeatherApi.Services
{
    public class RedisService
    {

        private readonly IConnectionMultiplexer _redis;

        public RedisService(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task<T?> GetItem<T>(string key) 
        {
            var db = _redis.GetDatabase();
            var json = await db.StringGetAsync(key);
            if (!json.HasValue)
                return default;

            var result = JsonSerializer.Deserialize<T>(json);
            Debug.WriteLine("Redisten geldi");
            return result;
        }
        public async Task SetItem<T>(string key,T value,TimeSpan Expiration)
        {
            var db = _redis.GetDatabase();
            var json = JsonSerializer.Serialize(value);
            await db.StringSetAsync(key,json,Expiration);
            Debug.WriteLine("Redis e yazıldı");
        }
    }
}

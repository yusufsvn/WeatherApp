using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Nodes;
using WeatherApi.Models;

namespace WeatherApi.Services
{
    public class WeatherService
    {
        private readonly RedisService _redisService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        //redis e id yi gelen location verisindeki place_id kullanılacak
        private string UserRedisId = "";
        public WeatherService(RedisService redisService, HttpClient httpClient, IConfiguration configuration)
        {
            _redisService = redisService;
            _httpClient = httpClient;
            _configuration = configuration;
        }



        public async Task<string> GetWeatherAsync(string city)
        {
            string? BaseUrl = _configuration["WeatherApi:BaseUrl"];
            string? ApiKey = _configuration["WeatherApi:ApiKey"];

            //redisten kontrol et
            var cachedData = await _redisService.GetItem<string>(city);
            if (cachedData != null)
            {
                return cachedData;
            }

            string unitGroup = "metric";


            //apidan veri getir
            string Request = $"{BaseUrl}{city}/today?unitGroup={unitGroup}&key={ApiKey}";
            var response = await _httpClient.GetAsync(Request);
            //Requestin başarılı olduğundan  emin olmasını sağlar
            response.EnsureSuccessStatusCode();

            string jsonString = await response.Content.ReadAsStringAsync();
            //var weather = JsonSerializer.Deserialize<Weather>(jsonString);


            //redis e yaz
            TimeSpan expiration = TimeSpan.FromMinutes(5);
            await _redisService.SetItem<string>(city, jsonString, expiration);

            return jsonString;
        }

        public async Task<string> GetWeatherbyLocationAsync(Location locationObj)
        {

            // get configuration infos
            string? WeatherBaseUrl = _configuration["WeatherApi:BaseUrl"];
            string? WeatherApiKey = _configuration["WeatherApi:ApiKey"];

            string? LocationIQBaseUrl = _configuration["LocationIQApi:BaseUrl"];
            string? LocationIQApiKey = _configuration["LocationIQApi:ApiKey"];


            //check from redis 
            if (locationObj != null)
            {
                string RedisKey = $"{locationObj.Lon}/{locationObj.Lat}";
                var cachedData = await _redisService.GetItem<string>(RedisKey);
                if (cachedData != null)
                {
                    return cachedData;
                }
            }




            string unitGroup = "metric";

            //weather apidan veri getir
            string Request = $"{WeatherBaseUrl}{locationObj.Lat},{locationObj.Lon}/today?unitGroup={unitGroup}&key={WeatherApiKey}";
            var response = await _httpClient.GetAsync(Request);
            response.EnsureSuccessStatusCode();
            string jsonString = await response.Content.ReadAsStringAsync();
            
            
            //locationIQApi dan veri getir
            string RequestofLocation = $"{LocationIQBaseUrl}key={LocationIQApiKey}&lat={locationObj.Lat}&lon={locationObj.Lon}&format=json&";
            var responseofLocation = await _httpClient.GetAsync(RequestofLocation);
            responseofLocation.EnsureSuccessStatusCode();
            string LocationjsonStr = await responseofLocation.Content.ReadAsStringAsync();

            //data replace for resolved address
            string weatherData = JsonDataReplacer(jsonString, LocationjsonStr);

            string redisKey = $"{locationObj.Lon}/{locationObj.Lat}";
            //redis e yaz
            TimeSpan expiration = TimeSpan.FromMinutes(5);
            await _redisService.SetItem<string>(redisKey, weatherData, expiration);
            
            return weatherData;
        }


        public string JsonDataReplacer(string jsonString, string LocationjsonStr)
        {
            var jsonObject = JsonNode.Parse(LocationjsonStr)!.AsObject();
            var town = jsonObject["address"]?["town"];
            var province = jsonObject["address"]?["province"];
            var city_district = jsonObject["address"]?["city_district"];

            //Debug.WriteLine(town);

            //parse weather data
            var WeatherjsonObject = JsonNode.Parse(jsonString)!.AsObject();
            WeatherjsonObject["resolvedAddress"] = $"{province},{town},{city_district}";
            string? replacedData = JsonSerializer.Serialize(WeatherjsonObject);

            return replacedData;

        }
    }
}

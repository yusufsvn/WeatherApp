using Microsoft.AspNetCore.Mvc;
using WeatherApi.Models;
using WeatherApi.Services;

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("/api")]
    public class WeatherController : Controller
    {

        private readonly WeatherService _weatherService;
        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("getweather")]
        public async Task<IActionResult> GetWeatherAsync([FromQuery] string city)
        {
            string weather = await _weatherService.GetWeatherAsync(city);

            return Ok(weather);
        }

        [HttpPost("getweatherbylocation")]
        public async Task<IActionResult> GetWeatherbyLocationAsync([FromBody] Location location)
        {
            Console.WriteLine(location.Lat);
            try
            {
                string weather = await _weatherService.GetWeatherbyLocationAsync(location);
                return Ok(weather);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

# Weather Application

This project is a modern weather app that displays 1-day weather information for a location or city selected by the user. The app presents temperature and wind information for each hour through clear graphs.

## Features
- **Location or City Selection:** Users can access weather information using their current location or by searching for a city they want in Türkiye.
- **1-Day Detailed Weather:** Detailed 24-hour weather forecasts are provided for the selected location.
- **Hourly Temperature Graph:** An interactive graph showing temperature changes throughout the day.
- **Hourly Wind Graph:** A graph visualizing wind speed changes.
- **Fast and Efficient API Calls:** Redis caching saves API calls and speeds up data retrieval.

## How to works redis?
If the weather has not been queried before, it gets data from the weather API and writes it to redis. In subsequent queries, if there is weather data in the redis, it will get it from the redis, no need for an API call.

## Used technologies

#### Client
- Angular, Geolocation
#### API
- Asp.Net Core, Redis, VisualCrossing Api, LocationIQ Api

## Images

**Location Result**
![resim](https://github.com/user-attachments/assets/1bd69875-27c9-4457-babf-0353f2a5a59a)
**Enter city Name**
![Pasted image 20250527212125](https://github.com/user-attachments/assets/f86b689a-4d8c-4146-8ff2-27741baaddb5)
![resim](https://github.com/user-attachments/assets/902c50b0-40bb-4210-a8dd-52adff449ffa)
![resim](https://github.com/user-attachments/assets/58ae3fce-32cb-47a9-a3dd-d810bd01ff5c)



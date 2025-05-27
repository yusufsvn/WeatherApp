import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation desteklenmiyor');
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }

  sendLocationToServer(lat: number, lon: number): any {
    
    const location: Location = {
      Lat: lat.toFixed(2),
      Lon: lon.toFixed(2)
    };
    return this.http.post('https://localhost:7019/api/getweatherbylocation', location);
  }
}


export interface Location {
    Lat :string;
    Lon: string;
}
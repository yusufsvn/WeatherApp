import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../../Models/Weather';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Day } from '../../Models/Day';
import { ChartComponent } from "../chart/chart.component";
import { Hour } from '../../Models/Hour';
import {MatIconModule} from '@angular/material/icon';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-body',
  imports: [
    MatSidenavModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    ChartComponent,
    MatIconModule
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
  
})
export class BodyComponent {

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = [
    "Adana,TR",
    "Adıyaman,TR",
    "Afyonkarahisar,TR",
    "Ağrı,TR",
    "Amasya,TR",
    "Ankara,TR",
    "Antalya,TR",
    "Artvin,TR",
    "Aydın,TR",
    "Balıkesir,TR",
    "Bilecik,TR",
    "Bingöl,TR",
    "Bitlis,TR",
    "Bolu,TR",
    "Burdur,TR",
    "Bursa,TR",
    "Çanakkale,TR",
    "Çankırı,TR",
    "Çorum,TR",
    "Denizli,TR",
    "Diyarbakır,TR",
    "Edirne,TR",
    "Elazığ,TR",
    "Erzincan,TR",
    "Erzurum,TR",
    "Eskişehir,TR",
    "Gaziantep,TR",
    "Giresun,TR",
    "Gümüşhane,TR",
    "Hakkâri,TR",
    "Hatay,TR",
    "Isparta,TR",
    "Mersin,TR",
    "İstanbul,TR",
    "İzmir,TR",
    "Kars,TR",
    "Kastamonu,TR",
    "Kayseri,TR",
    "Kırklareli,TR",
    "Kırşehir,TR",
    "Kocaeli,TR",
    "Konya,TR",
    "Kütahya,TR",
    "Malatya,TR",
    "Manisa,TR",
    "Kahramanmaraş,TR",
    "Mardin,TR",
    "Muğla,TR",
    "Muş,TR",
    "Nevşehir,TR",
    "Niğde,TR",
    "Ordu,TR",
    "Rize,TR",
    "Sakarya,TR",
    "Samsun,TR",
    "Siirt,TR",
    "Sinop,TR",
    "Sivas,TR",
    "Tekirdağ,TR",
    "Tokat,TR",
    "Trabzon,TR",
    "Tunceli,TR",
    "Şanlıurfa,TR",
    "Uşak,TR",
    "Van,TR",
    "Yozgat,TR",
    "Zonguldak,TR",
    "Aksaray,TR",
    "Bayburt,TR",
    "Karaman,TR",
    "Kırıkkale,TR",
    "Batman,TR",
    "Şırnak,TR",
    "Bartın,TR",
    "Ardahan,TR",
    "Iğdır,TR",
    "Yalova,TR",
    "Karabük,TR",
    "Kilis,TR",
    "Osmaniye,TR",
    "Düzce,TR"
  ]
  filteredOptions: string[];

  constructor(private http: HttpClient,private locationService: LocationService) {
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }
  dataSource = new MatTableDataSource<Day>();
  displayedColumns: string[] = ['datetime', 'temp', 'tempmax', 'tempmin', 'humidity', 'windspeed', 'description', 'icon'];
  weatherData?: Weather;
  @Output() Hours: Hour[] = [];
  getWeather(): void {
    let city = this.myControl.value;

    this.http.get(`https://localhost:7019/api/getweather/?city=${city}`)
      .subscribe(
        {
          next: (data) => {
            const weather = Object.assign(new Weather(), data);
            weather.days[0].icon
            this.weatherData = weather;
            this.dataSource.data = weather.days || [];
            this.Hours = weather.days[0].hours;
            
            
          }, error: (err) => {
            console.error(err);
          }
        });
  }
  getWeatherIcon(): string {
    switch (this.weatherData?.days[0].icon) {
      case 'clear-day': return 'wb_sunny';                // Material Icon
      case 'clear-night': return 'nightlight';
      case 'partly-cloudy-day': return 'cloud_queue';
      case 'partly-cloudy-night': return 'cloud';
      case 'rain': return 'umbrella';
      case 'snow': return 'ac_unit';
      case 'sleet': return 'grain';
      case 'wind': return 'air';
      case 'fog': return 'foggy';
      case 'cloudy': return 'cloud';
      case 'thunderstorm': return 'flash_on';
      default: return 'help'; // Bilinmeyen
    }
  }

  sendLocation() {
    this.locationService.getCurrentPosition()
      .then(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.locationService.sendLocationToServer(lat, lon)
          .subscribe({
            next: (data: any) => {
              const weatherFromLocation = Object.assign(new Weather(), data);
              this.weatherData = weatherFromLocation;
              this.dataSource.data = weatherFromLocation.days || [];
              this.Hours = weatherFromLocation.days[0].hours;
            },
            error: (err: any) => console.error('Sunucuya gönderilemedi', err)
          });
      })
      .catch(err => console.error('Konum alınamadı:', err));
  }



}

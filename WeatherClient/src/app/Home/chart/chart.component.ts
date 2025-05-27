import { Component, Input, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Hour } from '../../Models/Hour';
import { curveMonotoneX } from 'd3-shape';
@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {


  hourlyData: any[] = [];
  private _hours: Hour[] = [];
  @Input()
  set hours(data: Hour[]) {
    this._hours = data;
    this.updateChartData();
  }
  get hours(): Hour[] {
    return this._hours;
  }
  newHoursTemp: Series[] = [];
  newHoursWind: Series[] = [];

  colorScheme = 'vivid'
  curve = curveMonotoneX;

  updateChartData() {
    this.newHoursTemp = [];
    this.newHoursWind = [];
    for (let i = 0; i < this.hours.length; i++) {

      const temp: Series = {
        name: this.hours[i].datetime,
        value: this.hours[i].temp
      }
      this.newHoursTemp.push(temp);

      const wind: Series = {
        name: this.hours[i].datetime,
        value: this.hours[i].windspeed
      }
      this.newHoursWind.push(wind);
    }

    this.hourlyData = [
    {
      name: 'Sıcaklık',
      series: this.newHoursTemp
    },
    {
      name: 'Rüzgar Hızı',
      series: this.newHoursWind
    }
  ];
  }

}


export class Series {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
} 
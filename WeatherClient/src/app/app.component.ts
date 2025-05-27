import { Component } from '@angular/core';
import { AppBarComponent } from "./Home/app-bar/app-bar.component";
import { BodyComponent } from "./Home/body/body.component";

@Component({
  selector: 'app-root',
  imports: [AppBarComponent,BodyComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WeatherClient';
  
}

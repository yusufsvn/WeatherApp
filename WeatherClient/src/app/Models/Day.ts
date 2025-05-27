import { Hour } from "./Hour";

export class Day {
  datetime!: string;
  tempmax!: number;
  tempmin!: number;
  temp!: number;
  feelslikemax!: number;
  feelslikemin!: number;
  feelslike!: number;
  dew!: number;
  humidity!: number;
  precip!: number;
  precipprob!: number;
  precipcover!: number;
  snow!: number;
  snowdepth!: number;
  windgust!: number;
  windspeed!: number;
  winddir!: number;
  pressure!: number;
  cloudcover!: number;
  visibility!: number;
  solarradiation!: number;
  solarenergy!: number;
  uvindex!: number;
  severerisk!: number;
  sunrise!: string;
  sunriseEpoch!: number;
  sunset!: string;
  sunsetEpoch!: number;
  moonphase!: number;
  conditions!: string;
  description!: string;
  icon!: string;
  source!: string;
  hours!: Hour[];
}

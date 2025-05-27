import { CurrentConditions } from "./CurrenConditions";
import { Day } from "./Day";

export class Weather {
  latitude!: number;
  longitude!: number;
  resolvedAddress!: string;
  description!: string;
  days!: Day[];
  alerts!: any[];
  place_id!: string;
  currentConditions!: CurrentConditions;
}

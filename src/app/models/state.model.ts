import { CountryResponse } from './country.model';

export interface StateResponse {
  country?: CountryResponse;
  description: string;
  id: number;
}

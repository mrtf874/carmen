import { StateResponse } from './state.model';

export interface CityResponse {
  description: string;
  id: number;
  state?: StateResponse;
}

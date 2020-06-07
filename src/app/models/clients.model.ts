import { CityResponse } from './city.model';
import { ContactFormResponse } from './contact-form.model';
import { QuotesResponse } from './quotes.model';

export interface ClientsResponse {
  address: string;
  birthday: string;
  city: CityResponse;
  contact_form: ContactFormResponse;
  email: string;
  id: number;
  job: string;
  mobile: string;
  names: string;
  notes: string;
  pdf_signed_form: string;
  phone: string;
  picture: string;
  postal_code: number;
  quotes: QuotesResponse;
  surnames: string;
}

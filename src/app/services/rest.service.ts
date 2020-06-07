import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsRequest } from '../models/clients-request.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient, private constan: ConstantsService) { }

  public getClients(): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CLIENTS;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getCountries(): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_COUNTRIES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getStateOfCountry(id: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_COUNTRIES + `/${id}/` + this.constan.URL_ALL_STATES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getCitiesOfState(id: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_STATES + `/${id}/` + this.constan.URL_ALL_CITIES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getEmployees(): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_EMPLOYEES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getContactForms(): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CONTACT_FORMS;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public getProcedures(): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_PROCEDURES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public postClient(form: any): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CLIENTS;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.post<any>(url, form, { params, headers });
  }


  public putClient(form: any, id: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CLIENTS + `/${id.toString()}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.put<any>(url, form, { params, headers });
  }

  public putQuotes(form: any, id: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_QUOTES + `/${id.toString()}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.put<any>(url, form, { params, headers });
  }

  public postQuotesByClient(form: any): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_QUOTES;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.post<any>(url, form, { params, headers });
  }

  public getClientsByBirthday(month: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CLIENTS;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    ).append(
      this.constan.BIRTHDAY, month.toString()
    );
    return this.httpClient.get<any>(url, { params, headers });
  }

  public deleteClientsById(id: number): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_ALL_CLIENTS + `/${id.toString()}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.delete<any>(url, { params, headers });
  }

  public postLogin(form: any): Observable<any> {
    const url = this.constan.URL_BASE + this.constan.URL_LOGIN;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const params = new HttpParams().append(
      this.constan.API_TOKEN_KEY, this.constan.API_TOKEN_VALUE
    );
    return this.httpClient.post<any>(url, form, { params, headers });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // GET THE VALUE OF KEY FROM SESSION STORAGE
  getSessionStorage(key: any) {
    if (key) {
      const session = sessionStorage.getItem(key);
      if (session) {
        return this.decodedData(session);
      }
    } else {
      return null;
    }
  }

  // SET A KEY AND VALUE TO SESSION STORAGE
  setSessionStorage(key: any, value: any) {
    const base = this.encodedData(value);
    sessionStorage.setItem(key, base);
  }

  // REMOVE KEY AND VALUE IN SESSION STORAGE
  clearSessionStorage(key: any) {
    sessionStorage.removeItem(key);
  }

  // DECODE THE DATA THAT IS IN BASE64
  decodedData = (data: any) => {
    data = atob(data);
    if (data.includes('{')) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  // ENCODE THE DATA IN BASE64
  encodedData = (data: any) => btoa(JSON.stringify(data));
}

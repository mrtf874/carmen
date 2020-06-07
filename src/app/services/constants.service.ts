import { Injectable } from '@angular/core';
import { ClientsResponse } from '../models/clients.model';
import { QuotesRequest } from '../models/quotes-request.model';

@Injectable({
  providedIn: 'root'
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class ConstantsService {

  constructor() { }

  /**
   * * Navbar constants.
   */
  public NAVBAR_ITEMS = [{ text: 'Cliente', link: 'client' }, { text: 'Búsquedas', link: 'queries' }];
  public FIRST_ITEM_NAVBAR = 0;
  public TEXT_BUTTON_NAVBAR = 'Cerrar sesión';
  public LINK_MAIN_PAGE = 'https://carmeng.com';

  /**
   * * Client Form.
   */
  public STATE_CORRECT_FORM = 'VALID';
  public ENTRY_ERROR = 'Campo incorrecto';
  public PDF_BASE = 'data:application/octet-stream;base64,';
  public IMAGE_BASE_JPEG = 'data:image/jpeg;base64,';
  public IMAGE_BASE_JPG = 'data:image/jpg;base64,';
  public IMAGE_BASE_PNG = 'data:image/png;base64,';
  public NULL_QUOTE: QuotesRequest = {
    client_id: null,
    date: '',
    employee_id: null,
    notes: '',
    procedure_id: null,
    picture_before: '',
    picture_after: ''
  };
  public month = [
    {
      id: '01', description: 'Enero'
    },
    {
      id: '02', description: 'Febrero'
    },
    {
      id: '03', description: 'Marzo'
    },
    {
      id: '04', description: 'Abril'
    },
    {
      id: '05', description: 'Mayo'
    },
    {
      id: '06', description: 'Junio'
    },
    {
      id: '07', description: 'Julio'
    },
    {
      id: '08', description: 'Agosto'
    },
    {
      id: '09', description: 'Septiembre'
    },
    {
      id: '10', description: 'Octubre'
    },
    {
      id: '11', description: 'Noviembre'
    },
    {
      id: '12', description: 'Diciembre'
    }
  ];

  /**
   * * Rest Constants
   */
  public URL_BASE = 'http://cecgapi.carmeng.com/api/v1/';
  public CONTENT_TYPE_KEY = 'Content-Type';
  public CONTENT_TYPE_VALUE = 'application/json';
  public ACCESS_CONTROL_KEY = 'Access-Control-Allow-Origin';
  public ACCESS_CONTROL_VALUE = '*';
  public API_TOKEN_KEY = 'api_token';
  public API_TOKEN_VALUE = 'SyOm1qQFaEGwpCgcid8GYEIsTWOXZ5VjOkzv2jaaJe8wfg296JiYfsSk9j5C';
  public URL_ALL_CLIENTS = 'clients';
  public URL_ALL_COUNTRIES = 'countries';
  public URL_ALL_STATES = 'states';
  public URL_ALL_CITIES = 'cities';
  public URL_ALL_EMPLOYEES = 'employees';
  public URL_ALL_PROCEDURES = 'procedures';
  public URL_QUOTES = 'quotes';
  public URL_LOGIN = 'users/login';
  public URL_ALL_CONTACT_FORMS = 'contact-forms';
  public BIRTHDAY = 'birthday';
  // PATTERN TO VALID EMAIL
  public EMAIL_PATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  public LOG_RES = 'LoginOk';

  /**
   * * GLOBAL STATICS VARIABLES
   */
  public CLIENTS: ClientsResponse[] = [];
  public STATE = false;
  public STATE_FIRST = true;
  public REFRESH_TABLE = false;
}

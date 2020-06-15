import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { RestService } from 'src/app/services/rest.service';
import { CountryResponse } from 'src/app/models/country.model';
import { EmployeeResponse } from 'src/app/models/employee.model';
import { ContactFormResponse } from 'src/app/models/contact-form.model';
import { StateResponse } from 'src/app/models/state.model';
import { CityResponse } from 'src/app/models/city.model';
import { QuotesRequest } from 'src/app/models/quotes-request.model';
import { ProcedureResponse } from 'src/app/models/procedure.model';
import { ClientsRequest } from 'src/app/models/clients-request.model';


@Component({
  selector: 'ceg-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class ClientComponent implements OnInit {

  public profileForm: FormGroup;
  public quoteForm: FormGroup;
  public isDisabled: boolean;
  public countries: CountryResponse[];
  public employees: EmployeeResponse[];
  public contactForms: ContactFormResponse[];
  public states: StateResponse[];
  public cities: CityResponse[];
  public procedures: ProcedureResponse[];
  public disableState = new FormControl(true);
  public disableCities = new FormControl(true);
  public quotes: QuotesRequest[];
  public finalForm: ClientsRequest;
  public quotesIndex: any[];
  public addQuote: boolean;
  public indicative: string;
  private base64textString: any;
  private PDFbase64textString: any;
  public spinner: boolean;

  constructor(private formBuilder: FormBuilder, public constants: ConstantsService, private rest: RestService) {
    this.indicative = '';
    this.finalForm = new ClientsRequest();
    this.addQuote = true;
    this.quotes = [];
    this.quotesIndex = [];
    this.quotesIndex.push('');
    this.isDisabled = true;
    this.quoteForm = formBuilder.group({
      date: [null, Validators.required],
      employee_id: [null, Validators.required],
      notes: [null],
      procedure_id: [null, Validators.required]
    });
    this.profileForm = formBuilder.group({
      names: [null, Validators.required],
      surnames: [null, Validators.required],
      email: [null, Validators.compose([Validators.pattern(constants.EMAIL_PATTERN)])],
      birthday: [null, Validators.required],
      phone: [null],
      mobile: [null, Validators.required],
      address: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      code: [null, Validators.required],
      country: [null, Validators.required],
      occupation: [null, Validators.required],
      contact: [null, Validators.required],
      commentary: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getCountries();
    this.getEmployees();
    this.getContactForms();
    this.getProcedures();
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  private getCountries() {
    this.rest.getCountries().subscribe((allCountries) => {
      this.countries = allCountries.data;
    }, (errorAllCountries) => {
      console.error(errorAllCountries);
    });
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  public getStates(id: number) {
    if (id) {
      this.rest.getStateOfCountry(id).subscribe((states) => {
        this.states = states;
        this.disableState.setValue(false);
      }, (errorState) => {
        console.error(errorState);
      });
    }
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  public getCities(id: number) {
    if (id) {
      this.rest.getCitiesOfState(id).subscribe((cities) => {
        this.cities = cities;
        this.disableCities.setValue(false);
      }, (errorCities) => {
        console.error(errorCities);
      });
    }
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  private getEmployees() {
    this.rest.getEmployees().subscribe((allEmployees) => {
      this.employees = allEmployees.data;
    }, (errorAllEmployees) => {
      console.error(errorAllEmployees);
    });
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  private getContactForms() {
    this.rest.getContactForms().subscribe((contactForms) => {
      this.contactForms = contactForms.data;
    }, (errorContactForms) => {
      console.error(errorContactForms);
    });
  }

  /**
   * @description Subscription to API REST to get a countries list.
   */
  private getProcedures() {
    this.rest.getProcedures().subscribe((procedures) => {
      this.procedures = procedures.data;
    }, (errorProcedures) => {
      console.error(errorProcedures);
    });
  }

  public addRow(): void {
    this.quotesIndex.push('');
    this.addQuote = true;
  }

  /**
   * @description Submit form
   * @param ClientFormModel form
   * @returns form ClientFormModel
   */
  public onQuotesSubmit(quotes: QuotesRequest) {
    if (this.addQuote) {
      this.quotes.push(quotes);
    }
    this.addQuote = false;
  }

  public changeListener($event): void {
    this.readThis($event.target);
  }

  private readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => { this.base64textString = myReader.result; };
    myReader.readAsDataURL(file);
  }

  public readPDF($event): void {
    this.savePDF($event.target);
  }
  private savePDF(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => { this.PDFbase64textString = myReader.result; };
    myReader.readAsDataURL(file);
  }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  /**
   * @description Submit form
   * @param ClientFormModel form
   * @returns form ClientFormModel
   */
  public onFormSubmit(form) {
    let finalForm: ClientsRequest;
    finalForm = new ClientsRequest();
    finalForm.address = form.address;
    finalForm.birthday = this.formatDate(form.birthday);
    finalForm.city_id = form.city;
    finalForm.contact_form_id = form.contact;
    finalForm.email = form.email;
    finalForm.job = form.occupation;
    finalForm.mobile = form.mobile;
    finalForm.names = form.names;
    finalForm.notes = form.commentary;
    finalForm.pdf_signed_form = this.PDFbase64textString ? this.PDFbase64textString : 'null';
    finalForm.phone = form.phone;
    finalForm.postal_code = form.code;
    finalForm.surnames = form.surnames;
    finalForm.picture = this.base64textString ? this.base64textString : 'null';
    this.spinner = true;
    this.rest.postClient(finalForm).subscribe((clientResponse) => {
      this.quotes.forEach((quote) => {
        let quoteRequest: QuotesRequest;
        quoteRequest = new QuotesRequest();
        quoteRequest.date = this.formatDate(quote.date);
        quoteRequest.employee_id = quote.employee_id;
        quoteRequest.notes = quote.notes;
        quoteRequest.picture_after = 'null';
        quoteRequest.picture_before = 'null';
        quoteRequest.procedure_id = quote.procedure_id;
        quoteRequest.client_id = clientResponse.data.id;
        console.log(quoteRequest);
        this.rest.postQuotesByClient(quoteRequest).subscribe((quotesResponse) => {
          this.spinner = false;
          alert('Usuario agregado con éxito');
          this.quoteForm.reset();
          this.profileForm.reset();
          Object.keys(this.quoteForm.controls).forEach(key => {
            this.quoteForm.get(key).setErrors(null);
          });
          Object.keys(this.profileForm.controls).forEach(key => {
            this.profileForm.get(key).setErrors(null);
          });
        }, (errorQuotes) => {
          console.error(errorQuotes);
          this.spinner = false;
          this.quoteForm.reset();
          this.profileForm.reset();
          Object.keys(this.quoteForm.controls).forEach(key => {
            this.quoteForm.get(key).setErrors(null);
          });
          Object.keys(this.profileForm.controls).forEach(key => {
            this.profileForm.get(key).setErrors(null);
          });
          alert('Ha ocurrido un error al agregar las citas del cliente. Sin embargo, el cliente fue creado con éxito.');
        });
      });
    }, errorClientResponse => {
      console.error(errorClientResponse);
      this.quoteForm.reset();
      this.profileForm.reset();
      Object.keys(this.quoteForm.controls).forEach(key => {
        this.quoteForm.get(key).setErrors(null);
      });
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key).setErrors(null);
      });
      this.spinner = false;
      alert('Ha ocurrido un error');
    });
  }
}

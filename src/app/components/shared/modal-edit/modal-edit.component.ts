import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { ClientsResponse } from 'src/app/models/clients.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { ContactFormResponse } from 'src/app/models/contact-form.model';
import { CountryResponse } from 'src/app/models/country.model';
import { EmployeeResponse } from 'src/app/models/employee.model';
import { StateResponse } from 'src/app/models/state.model';
import { CityResponse } from 'src/app/models/city.model';
import { ProcedureResponse } from 'src/app/models/procedure.model';
import { ClientsRequest } from 'src/app/models/clients-request.model';
import { QuotesRequest } from 'src/app/models/quotes-request.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalEditQuotesComponent } from '../modal-edit-quotes/modal-edit-quotes.component';

@Component({
  selector: 'ceg-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  public client: ClientsResponse;
  public profileForm: FormGroup;
  public isDisabled: boolean;
  public countries: CountryResponse[];
  public contactForms: ContactFormResponse[];
  public states: StateResponse[];
  public cities: CityResponse[];
  public disableState = new FormControl(true);
  public disableCities = new FormControl(true);
  public quotes: QuotesRequest[];
  public quotesIndex: any[];
  public addQuote: boolean;
  public base64textString: any;
  spinner: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, public constants: ConstantsService, private rest: RestService, public dialog: MatDialog) {
    this.getCountries();
    this.getContactForms();
  }

  ngOnInit() {
    console.log(this.client);
    this.cities = [this.client.city];
    this.states = [this.client.city.state];
    this.countries = [this.client.city.state.country];
    this.contactForms = [this.client.contact_form];
    console.log(this.cities);
    console.log(this.states);
    console.log(this.countries);
    this.profileForm = this.formBuilder.group({
      names: [this.client.names, Validators.required],
      surnames: [this.client.surnames, Validators.required],
      email: [this.client.email, Validators.compose([Validators.required, Validators.pattern(this.constants.EMAIL_PATTERN)])],
      birthday: [this.client.birthday, Validators.required],
      phone: [this.client.phone, Validators.required],
      mobile: [this.client.mobile, Validators.required],
      address: [this.client.address, Validators.required],
      city: [this.client.city.id, Validators.required],
      state: [this.client.city.state.id, Validators.required],
      code: [this.client.postal_code, Validators.required],
      country: [this.client.city.state.country.id, Validators.required],
      occupation: [this.client.job, Validators.required],
      contact: [this.client.contact_form.id, Validators.required],
      commentary: [this.client.notes, Validators.required]
    });
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
    if ( id ) {
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
    if ( id ) {
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
  private getContactForms() {
    this.rest.getContactForms().subscribe((contactForms) => {
      this.contactForms = contactForms.data;
    }, (errorContactForms) => {
      console.error(errorContactForms);
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
    if ( this.addQuote ) {
      this.quotes.push(quotes);
    }
    this.addQuote = false;
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

  public changeListener($event): void {
    this.readThis($event.target);
  }

  private readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => { this.base64textString = myReader.result; };
    myReader.readAsDataURL(file);
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
    finalForm.phone = form.phone;
    finalForm.postal_code = form.code;
    finalForm.surnames = form.surnames;
    finalForm.picture = this.base64textString ? this.base64textString : this.client.picture;
    finalForm.id = this.client.id;
    this.spinner = true;
    this.rest.putClient(finalForm, this.client.id).subscribe((clientResponse) => {
      this.getClients();
    }, errorClientResponse => {
      console.error(errorClientResponse);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }

  private getClients() {
    this.constants.REFRESH_TABLE =  true;
    this.rest.getClients().subscribe((allClients) => {
      this.constants.CLIENTS = allClients.data;
      this.constants.REFRESH_TABLE =  false;
      this.dialogRef.close();
      this.spinner = false;
    }, (errorAllClients) => {
      console.error(errorAllClients);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }

  public editQuote(form: any) {
    const dialogRef = this.dialog.open(ModalEditQuotesComponent);
    dialogRef.componentInstance.quote = form;
    dialogRef.componentInstance.clientId = this.client.id;
    this.dialogRef.close();
  }
}

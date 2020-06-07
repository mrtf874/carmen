import { Component, OnInit } from '@angular/core';
import { ProcedureResponse } from 'src/app/models/procedure.model';
import { EmployeeResponse } from 'src/app/models/employee.model';
import { QuotesResponse } from 'src/app/models/quotes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ConstantsService } from 'src/app/services/constants.service';
import { RestService } from 'src/app/services/rest.service';
import { QuotesRequest } from 'src/app/models/quotes-request.model';

@Component({
  selector: 'ceg-modal-add-quote',
  templateUrl: './modal-add-quote.component.html',
  styleUrls: ['./modal-add-quote.component.css']
})
export class ModalAddQuoteComponent implements OnInit {

  public quoteForm: FormGroup;
  public clientId: number;
  public procedures: ProcedureResponse[];
  public employees: EmployeeResponse[];
  public quote: QuotesResponse;
  private base64textStringAfter: any;
  private base64textStringBefore: any;
  spinner: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, public constants: ConstantsService, private rest: RestService) {
    this.getEmployees();
    this.getProcedures();
  }

  ngOnInit() {
    this.quoteForm = this.formBuilder.group({
      date: [null, Validators.required],
      employee: [null, Validators.required],
      notes: [null],
      procedure: [null, Validators.required]
    });
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

  public changeListener($event, after: boolean): void {
    this.readThis($event.target, after);
  }

  private readThis(inputValue: any, after: boolean): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    if (after) {
      myReader.onloadend = (e) => { this.base64textStringAfter = myReader.result; };
    } else {
      myReader.onloadend = (e) => { this.base64textStringBefore = myReader.result; };
    }
    myReader.readAsDataURL(file);
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

  public onQuotesSubmit(form: any) {
    let quoteRequest: QuotesRequest;
    quoteRequest = new QuotesRequest();
    quoteRequest.date = this.formatDate(form.date);
    quoteRequest.employee_id = form.employee;
    quoteRequest.notes = form.notes;
    quoteRequest.picture_after = this.base64textStringAfter ? this.base64textStringAfter : 'null';
    quoteRequest.picture_before = this.base64textStringBefore ? this.base64textStringBefore : 'null';
    quoteRequest.procedure_id = form.procedure;
    quoteRequest.client_id = this.clientId;
    this.spinner = true;
    this.rest.postQuotesByClient(quoteRequest).subscribe((quotesResponse) => {
      this.getClients();
      alert('Cita agregado con éxito');
    }, (errorQuotes) => {
      console.error(errorQuotes);
      this.spinner = false;
      alert('Ha ocurrido un error');
    });
  }

  private getClients() {
    this.spinner = true;
    this.constants.REFRESH_TABLE = true;
    this.rest.getClients().subscribe((allClients) => {
      this.constants.CLIENTS = allClients.data;
      this.constants.REFRESH_TABLE = false;
      this.spinner = false;
      this.dialogRef.close();
    }, (errorAllClients) => {
      console.error(errorAllClients);
      this.spinner = false;
      alert('Ha ocurrido un error');
    });
  }

}

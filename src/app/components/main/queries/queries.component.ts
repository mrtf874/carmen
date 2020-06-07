import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { ClientsResponse } from 'src/app/models/clients.model';
import { ModalViewComponent } from '../../shared/modal-view/modal-view.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'ceg-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class QueriesComponent implements OnInit {

  public birthdayForm: FormGroup;
  public isDisabled: boolean;
  public showTable: boolean;
  public clients: ClientsResponse[];
  public spinner = true;

  constructor(private formBuilder: FormBuilder, private rest: RestService, public constant: ConstantsService, public dialog: MatDialog) {
    this.birthdayForm = formBuilder.group({
      birthday: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getClients();
  }

  private getClients() {
    this.spinner = true;
    this.rest.getClients().subscribe((allClients) => {
      this.constant.CLIENTS = allClients.data;
      this.spinner = false;
      this.showTable = true;
    }, (errorAllClients) => {
      console.error(errorAllClients);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }

  /**
   * @description Submit form
   * @param ClientFormModel form
   * @returns form ClientFormModel
   */
  public onFormSubmit(form) { }

  public getClientsByBirthday(month: number) {
    this.spinner = true;
    this.rest.getClientsByBirthday(month).subscribe((clientRes) => {
      this.clients = clientRes.data;
      this.spinner = false;
    }, (errorBirthday) => {
      console.error(errorBirthday);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }

  public viewDetail(client: ClientsResponse) {
    console.log(client);
    const dialogRef = this.dialog.open(ModalViewComponent);
    dialogRef.componentInstance.client = client;
  }
}

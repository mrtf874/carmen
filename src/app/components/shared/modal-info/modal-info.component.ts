import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestService } from 'src/app/services/rest.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'ceg-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {

  public id: number;
  spinner: boolean;

  constructor(private rest: RestService, public dialogRef: MatDialogRef<any>, private constant: ConstantsService) { }

  onClickEvent(): void {
    this.rest.deleteClientsById(this.id).subscribe((clientRes) => {
      console.log(clientRes);
      this.getClients();
    }, (errorBirthday) => {
      console.error(errorBirthday);
    });
  }

  private getClients() {
    this.spinner = true;
    this.constant.REFRESH_TABLE =  true;
    this.rest.getClients().subscribe((allClients) => {
      this.constant.CLIENTS = allClients.data;
      this.constant.REFRESH_TABLE =  false;
      this.dialogRef.close();
      this.spinner = false;
    }, (errorAllClients) => {
      console.error(errorAllClients);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }
}

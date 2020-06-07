import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'ceg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showTable: boolean;

  constructor(private rest: RestService, private constant: ConstantsService) {
    this.showTable = false;
  }

  ngOnInit() {
    this.rest.getClients().subscribe((allClients) => {
      this.constant.CLIENTS = allClients.data;
      this.showTable = true;
    }, (errorAllClients) => {
      console.error(errorAllClients);
    });
  }

}

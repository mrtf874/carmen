import { Component, OnInit, QueryList, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { ClientsResponse } from 'src/app/models/clients.model';
import { TableService } from 'src/app/services/table.service';
import { SortableDirective, SortEvent } from 'src/app/directives/sortable.directive';
import { ConstantsService } from 'src/app/services/constants.service';
import { MatDialog } from '@angular/material';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { ModalAddQuoteComponent } from '../modal-add-quote/modal-add-quote.component';

@Component({
  selector: 'ceg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ TableService, DecimalPipe]
})

/**
 * @author Jhon Alexander López Bohórquez (jhon.alexander.lopez@ibm.com)
 * @description This component consumes services and show a list of all clients
 */
export class TableComponent implements OnInit {
  public clients$: Observable<ClientsResponse[]>;
  public total$: Observable<number>;
  public selected: string;

  @ViewChild('PDF', {static: false}) download: ElementRef;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public tableService: TableService, public constant: ConstantsService, public dialog: MatDialog) {
    this.clients$ = tableService.clients$;
    this.total$ = tableService.total$;
    this.selected = '50';
  }

  ngOnInit() {}

  public onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }

  public onChangePageSize(size: number) {
    this.tableService.pageSize = size;
  }

  public downloadPDF(pdf: string) {
    this.download.nativeElement.href = this.constant.PDF_BASE + pdf;
    this.download.nativeElement.click();
  }

  public viewDetail(client: ClientsResponse) {
    const dialogRef = this.dialog.open(ModalViewComponent);
    dialogRef.componentInstance.client = client;
  }

  public editClient(client: ClientsResponse) {
    const dialogRef = this.dialog.open(ModalEditComponent);
    dialogRef.componentInstance.client = client;
  }

  public deleteClientById(id: number) {
    const dialogRef = this.dialog.open(ModalInfoComponent);
    dialogRef.componentInstance.id = id;
  }

  public addQuote(id: number) {
    const dialogRef = this.dialog.open(ModalAddQuoteComponent);
    dialogRef.componentInstance.clientId = id;
  }
}

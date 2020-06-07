import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ClientsResponse } from 'src/app/models/clients.model';
import { ConstantsService } from 'src/app/services/constants.service';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from 'src/app/directives/sortable.directive';

interface SearchResult {
  clients: ClientsResponse[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(clients: ClientsResponse[], column: string, direction: string): ClientsResponse[] {
  if (direction === '') {
    return clients;
  } else {
    return [...clients].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(client: ClientsResponse, term: string, pipe: PipeTransform) {
  return client.names.toLowerCase().includes(term.toLowerCase())
    || client.surnames.toLowerCase().includes(term.toLowerCase()) || client.city.description.toLowerCase().includes(term.toLowerCase())
    || client.city.state.description.toLowerCase().includes(term.toLowerCase())
    || client.city.state.country.description.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class TableService {
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _clients$ = new BehaviorSubject<ClientsResponse[]>([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private constant: ConstantsService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._clients$.next(result.clients);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get clients$() { return this._clients$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) { this._set({ page }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    let clients = sort(this.constant.CLIENTS, sortColumn, sortDirection);
    clients = clients.filter(client => matches(client, searchTerm, this.pipe));
    const total = clients.length;
    clients = clients.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ clients, total });
  }
}

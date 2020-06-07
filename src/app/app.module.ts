import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatInputModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { SignatureComponent } from './components/shared/signature/signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HomeComponent } from './components/main/home/home.component';
import { SortableDirective } from './directives/sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/shared/modal/modal.component';
import { TableComponent } from 'src/app/components/shared/table/table.component';
import { AgePipe } from './pipes/age.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ModalViewComponent } from './components/shared/modal-view/modal-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/main/login/login.component';
import { ModalEditComponent } from './components/shared/modal-edit/modal-edit.component';
import { ModalEditQuotesComponent } from './components/shared/modal-edit-quotes/modal-edit-quotes.component';
import { ModalInfoComponent } from './components/shared/modal-info/modal-info.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ModalAddQuoteComponent } from './components/shared/modal-add-quote/modal-add-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RoutingComponent,
    SignatureComponent,
    HomeComponent,
    SortableDirective,
    ModalComponent,
    AgePipe,
    TableComponent,
    ModalViewComponent,
    LoginComponent,
    ModalEditComponent,
    ModalEditQuotesComponent,
    ModalInfoComponent,
    SpinnerComponent,
    SafeHtmlPipe,
    ModalAddQuoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SignaturePadModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  providers: [
    MatDatepickerModule
  ],
  entryComponents: [ModalEditComponent, ModalViewComponent, ModalEditQuotesComponent, ModalInfoComponent, ModalAddQuoteComponent, AppComponent],
   bootstrap: [AppComponent]
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AppComponent, { injector });
    customElements.define('ceg-element', el);
  }

  ngDoBootstrap() {}
}


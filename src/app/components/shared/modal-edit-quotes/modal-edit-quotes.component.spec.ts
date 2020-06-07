import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditQuotesComponent } from './modal-edit-quotes.component';

describe('ModalEditQuotesComponent', () => {
  let component: ModalEditQuotesComponent;
  let fixture: ComponentFixture<ModalEditQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

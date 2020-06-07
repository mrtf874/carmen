import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddQuoteComponent } from './modal-add-quote.component';

describe('ModalAddQuoteComponent', () => {
  let component: ModalAddQuoteComponent;
  let fixture: ComponentFixture<ModalAddQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, ViewChild, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'ceg-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class SignatureComponent implements OnInit, AfterViewInit {

  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;
  @ViewChildren('sigContainer') public sigContainer: QueryList<ElementRef>;

  public signaturePadOptions: any = {
    minWidth: 3,
    canvasHeight: 150
  };

  constructor() {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.beResponsive();
  }

  public beResponsive() {
    this.signaturePad.set('canvasWidth', this.sigContainer.first.nativeElement.clientWidth);
  }

  public drawStart() {
  }

  public drawComplete() {
  }

  public clear() {
    this.signaturePad.clear();
  }

}

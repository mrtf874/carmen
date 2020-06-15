import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantsService } from 'src/app/services/constants.service';
import * as html2pdf from 'html2pdf.js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ceg-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public name: string;
  public name1: string;
  public name2: string;
  public name3: string;
  public name4: string;
  public name5: string;
  public name6: string;
  public name7: string;
  public name8: string;
  public name9: string;
  public name10: string;
  public name11: string;
  public name12: string;
  public name13: string;
  public name14: string;
  public name15: string;
  public name16: string;
  public nameBeautician: string;
  public initials: string;
  public email: string;
  public fecha1: string;
  public fecha2: string;
  public age1: string;
  public phoneNumber: string;
  public birthdate: Date;
  public process: string;
  public numberVisits: string;
  public cost: string;
  public date: Date;
  public hear: string;
  public commentary: string;
  public eyebrows: boolean;
  public pref1: boolean;
  public pref2: boolean;
  public pref3: boolean;
  public pref4: boolean;
  public pref5: boolean;
  public pref6: boolean;
  public pref7: boolean;
  public pref8: boolean;
  public eyes: boolean;
  public lips: boolean;
  public nipple: boolean;
  public camouflage: boolean;
  public pigmentation: boolean;
  public tattoos: boolean;
  public allergies: boolean;
  public diabetes: boolean;
  public pregnant: boolean;
  public keloide: boolean;
  public contagious: boolean;
  public adicional: boolean;
  public signatureDate: Date;
  public language: boolean;
  closeResult: string;

  constructor(private modalService: NgbModal, public constants: ConstantsService) {
    this.eyebrows = false;
    this.eyes = false;
    this.lips = false;
    this.nipple = false;
    this.camouflage = false;
    this.pigmentation = false;
    this.tattoos = false;
    this.allergies = false;
    this.diabetes = false;
    this.pregnant = false;
    this.keloide = false;
    this.contagious = false;
    this.adicional = false;
    this.language = false;
  }

  ngOnInit() { }


  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'xl', scrollable: true, centered: true });
  }

  htmlToPDF() {
    const options = {
      filename: 'Consentimiento_Informado.pdf',
      margin: 0.1,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const content: Element = document.getElementById('pdfConsent');
    html2pdf().from(content).set(options).save();
  }
}

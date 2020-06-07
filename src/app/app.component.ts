import { Component } from '@angular/core';
import { ConstantsService } from './services/constants.service';

@Component({
  selector: 'ceg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class AppComponent {
  title = 'Carmen Galindo';

  constructor(public constants: ConstantsService) {}
}

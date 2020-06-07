import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ceg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class NavbarComponent implements OnInit {


  constructor(private router: Router, public constants: ConstantsService) {}

  ngOnInit() {}

  public logOut() {
    this.constants.STATE = false;
    this.router.navigate(['/login']);
  }
}

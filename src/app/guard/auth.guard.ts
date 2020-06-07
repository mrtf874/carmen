import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantsService } from 'src/app/services/constants.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: ConstantsService, private router: Router) { }

  canActivate() {
    if (this.auth.STATE) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

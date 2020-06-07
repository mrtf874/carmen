import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request.model';

@Component({
  selector: 'ceg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public profileForm: FormGroup;
  private login: LoginRequest;
  public spinner: boolean;

  constructor(public formBuilder: FormBuilder, public constant: ConstantsService, private rest: RestService, private router: Router) {
    this.profileForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(constant.EMAIL_PATTERN)])],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  /**
   * @description Submit form
   * @param FormModel form
   * @returns form ClientFormModel
   */
  public onFormSubmit(form) {
    this.spinner = true;
    this.login = form;
    this.rest.postLogin(this.login).subscribe((logRes) => {
      this.constant.STATE = (logRes.msg === this.constant.LOG_RES);
      if (this.constant.STATE) {
        this.constant.STATE_FIRST = false;
        this.router.navigate(['/client']);
        this.spinner = false;
      } else {
        alert('Contraseña incorrecta');
        this.spinner = false;
      }
    }, errorLog => {
      console.error(errorLog);
      alert('Ha ocurrido un error');
      this.spinner = false;
    });
  }
}

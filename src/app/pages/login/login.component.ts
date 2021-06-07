import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthBody } from './../../interfaces/index';
import { AuthService } from '../../services/authentication/auth.service';

import { ToastrService } from 'ngx-toastr';
import { LoginConsts, LoginTags } from './constants/login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {
  public isHide: boolean;
  public loginFormGroup: FormGroup;
  public tags: any;

  constructor(
    private authService: AuthService,
    private readonly builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.tags = LoginTags;
    this.isHide = true;
    this.loginFormGroup = this.builder.group({
      email: '',
      password: ''
    });

  }

  ngOnInit(): void {
    this.initForm(this.builder);
    this.validateLoggedUser();
  }

  /**
   * @description Send a request to log into the system
   */
  public onSubmit(): void {
    const bodyRequest = this.createAuthBody();
    this.authService.login(bodyRequest)
    .then((res) => {
      if (res.token) {
        this.toastr.success(LoginConsts.MESSAGE_WELCOME)
        this.router.navigate([LoginConsts.ROUTE_HOME]);
      } else {
        if (res.error === LoginConsts.ERROR_USER_NOT_FOUND) {
          this.toastr.error(LoginConsts.ERROR_USER_NOT_EXISTS)
        } else {
          this.toastr.error(LoginConsts.ERROR_LOGIN)
        }
        this.router.navigate([LoginConsts.ROUTE_NOT_FOUND]);
      }
    })
    .catch((err) => {
      this.toastr.error(LoginConsts.ERROR_LOGIN)
      this.router.navigate([LoginConsts.ROUTE_NOT_FOUND])
    })
  }

  /**
   * @description Determinate email error message
   * @returns {string} Error message to be display inline
   */
  public getErrorMessage(): string {
    if (this.loginFormGroup.controls.email.hasError(LoginConsts.KEY_REQUIRED)) {
      return LoginConsts.ERROR_EMAIL_REQUIRED;
    }

    return this.loginFormGroup.controls.email.hasError(LoginConsts.KEY_EMAIL) ? LoginConsts.ERROR_EMAIL_INVALID : LoginConsts.EMPTY_STRING;
  }

  /**
   * @description Initialize the login form
   * @param {FormBuilder} formBuilder Builder to create form config
   */
  private initForm(formBuilder: FormBuilder): void {
    this.loginFormGroup = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * @description Creates authBody used in login request
   * @returns {AuthBody} Body to send to login request
   */
  private createAuthBody(): AuthBody {
    const authBody = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password
    };

    return authBody;
  }

  /**
   * @description Check if user is logged
   */
  private validateLoggedUser(): void {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate([LoginConsts.ROUTE_HOME]);
    }
  }

  /**
   * @description Shows a in progress toaster
   */
  public inProgress(): void {
    this.toastr.warning(LoginConsts.FUNCTION_UNAVAILABLE);
  }
}

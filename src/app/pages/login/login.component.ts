import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthBody } from './../../interfaces/index';
import { AuthService } from '../../services/authentication/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {
  public isHide: boolean;
  public loginFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private readonly builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
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
        this.toastr.success(' Bienvenido al sistema')
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/not-found']);
      }
    })
    .catch((err) => { this.router.navigate(['/not-found']) })
  }

  /**
   * @description Determinate email error message
   * @returns {string} Error message to be display inline
   */
  public getErrorMessage(): string {
    if (this.loginFormGroup.controls.email.hasError('required')) {
      return 'El correo electrónico es requerido';
    }

    return this.loginFormGroup.controls.email.hasError('email') ? 'Ingresa un correo válido' : '';
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
      this.router.navigate(['/home'])
    }
  }

  /**
   * @description Shows a in progress toaster
   */
  public inProgress(): void {
    this.toastr.warning('Función no disponible. Continuamos trabajando...')
  }
}

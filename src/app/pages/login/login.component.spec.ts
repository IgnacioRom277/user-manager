import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoginComponent } from './login.component';
import { MaterialModule } from './../../modules/material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form validation', () => {
    expect(component.loginFormGroup.valid).toBeFalsy();

    let loginForm =  component.loginFormGroup;
    loginForm.setValue({email: "fakemail@gmail.com", password:"1234567"})
    expect(loginForm.valid).toBeTruthy();
  });

  it('email field validation', () => {
    let email = component.loginFormGroup.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();

    email.setValue("fakemail");
    expect(email.hasError('email')).toBeTruthy();
  });

  it('password field validation', () => {
    let password = component.loginFormGroup.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue("");
    expect(password.hasError('required')).toBeTruthy();

    password.setValue("fakepassword");
    expect(password.hasError('required')).toBeFalsy();
  });

  it('should return an error message for email input', () => {
    const loginForm = component.loginFormGroup;
    loginForm.setValue({email:"fakemail", password: "12345678"})
    expect(component.getErrorMessage()).toBe('Ingresa un correo válido');

    loginForm.setValue({email:"", password: "12345678"})
    expect(component.getErrorMessage()).toBe('El correo electrónico es requerido');
  })

});

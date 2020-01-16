import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAction } from 'src/app/state/user.actions';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = null;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }

  ngOnDestroy(): void {
    this.errorMessage = null;
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginAction(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value));
    } else {
      this.errorMessage = 'login.errorMessages.formLoginValidation';
    }

  }

}

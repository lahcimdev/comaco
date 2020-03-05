import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { LoginAction, UpdateUserStateAction, SetUserStateErrorMessageAction } from 'src/app/state/user/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  @Select(state => state.user.errorMessage)
  errorMessage$: Observable<string>;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetUserStateErrorMessageAction(null));
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginAction(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value));
    } else {
      this.store.dispatch(new SetUserStateErrorMessageAction('login.errorMessages.formLoginValidation'));    
    }

  }

}

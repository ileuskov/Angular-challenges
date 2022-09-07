import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, Output } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // they could be @Output() but (ngModel) does it automatically
  userName: any = '';
  password: any = '';
  constructor(private AuthService: AuthService, private router: Router) {}

  login(loginFormValue: any) {
    this.AuthService.loginUser(
      loginFormValue.userName,
      loginFormValue.password
    );
  }

  backToEvents() {
    this.router.navigate(['/events']);
  }
}

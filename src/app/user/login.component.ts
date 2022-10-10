import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, Output } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  // they could be @Output() but (ngModel) does it automatically
  userName: any = '';
  password: any = '';
  mouseoverLogin: boolean = false;
  loginInvalid = false;
  constructor(private AuthService: AuthService, private router: Router) {}

  login(loginFormValue: any) {
    this.AuthService.loginUser(
      loginFormValue.userName,
      loginFormValue.password
    ).subscribe((resp: any) => {
      if (!resp) {
        this.loginInvalid = true;
      } else {
        this.router.navigate(['/events']);
      }
    });
  }

  backToEvents() {
    this.router.navigate(['/events']);
  }
}

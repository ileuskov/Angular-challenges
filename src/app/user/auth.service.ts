import { IUser } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentUser!: IUser;
  loginUser(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'Rick',
      lastName: 'Sanchez',
    };
  }

  isAuthenticated() {
    //Noninverted Boolean => !! is not an operator; it's just the ! operator twice. It converts Object to boolean
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}

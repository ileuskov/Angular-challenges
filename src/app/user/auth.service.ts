import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  currentUser!: any;
  loginUser(userName: string, password: string): Observable<any> {
    const loginInfo = {
      username: userName,
      password: password,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data: any) => {
          this.currentUser = <IUser>data['user'];
        })
      )

      .pipe(
        catchError((err) => {
          return of(false);
        })
      );

    // this.currentUser = {
    //   id: 1,
    //   userName: userName,
    //   firstName: 'Rick',
    //   lastName: 'Sanchez',
    // };
  }

  isAuthenticated() {
    //Noninverted Boolean => !! is not an operator; it's just the ! operator twice. It converts Object to boolean
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    //by not returning it as an observable and directly subscribing to this observable,
    // we can just call the method in events-app without subscribing
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data) => {
          if (data instanceof Object) {
            this.currentUser = <IUser>data;
          }
        })
      )
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string): Observable<any> {
    //the api server is set up to handle such calls in form of /api/users/id
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  logout() {
    this.currentUser = undefined;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post('/api/logout', {}, options);
  }
}

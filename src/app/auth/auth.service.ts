import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.module';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfTKyK-fT2NEdKygfrv1TSk2Ig3kJ--z0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfTKyK-fT2NEdKygfrv1TSk2Ig3kJ--z0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.idToken,
            responseData.idToken,
            parseInt(responseData.expiresIn)
          );
        })
      );
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiredIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiredIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiredIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Este correo ya está registrado';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Este correo no existe';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Contraseña incorrecta';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Usuario deshabilitado';
        break;
    }
    return throwError(errorMessage);
  }
}

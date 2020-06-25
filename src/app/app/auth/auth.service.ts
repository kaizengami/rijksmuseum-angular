import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, Observable } from 'rxjs';
import { uptime } from 'process';
import { User } from './user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import {AngularFirestore} from 'angularfire2/firestore'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

enum Error {
  EmailNotFound = 'EMAIL_NOT_FOUND',
  InvalidPassword = 'INVALID_PASSWORD',
  UserDisabled = 'USER_DISABLED',
  EmailExists = 'EMAIL_EXISTS',
  OperationNotAllowed = 'OPERATION_NOT_ALLOWED',
  TooManyAttemptsTryLater = 'TOO_MANY_ATTEMPTS_TRY_LATER',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiKey = 'AIzaSyBRz-q8RXMnzWSEN179svKDgzwOfvhP0G8';
  // user = new Subject<User>();
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup({ email, password }: { email: string; password: string }) {
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        return value;
      })
      .catch((err) => {
        return err;
      });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        return value;
      })
      .catch((err) => {
        return err;
      });
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   // this.user.next(user);
  // }

  // signup({ email, password }: { email: string; password: string }) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // login2({ email, password }: { email: string; password: string }) {
  //   this.afAuth.auth.signInWithCredential(firebase.auth.)
  // }

  // login({ email, password }: { email: string; password: string }) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case Error.EmailExists:
        errorMessage = 'This email exists already';
        break;
      case Error.OperationNotAllowed:
        errorMessage = "You can't sign up";
        break;
      case Error.TooManyAttemptsTryLater:
        errorMessage = 'Too many attmepts, try later';
        break;
      case Error.EmailNotFound:
        errorMessage = 'Invalid login or password';
        break;
      case Error.InvalidPassword:
        errorMessage = 'Invalid login or password';
        break;
      case Error.UserDisabled:
        errorMessage = 'You do not have a permission to log in';
        break;
    }

    return throwError(errorMessage);
  }
}

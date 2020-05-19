import { Router } from '@angular/router';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetailService } from 'src/app/features/user-detail.service';
import * as firebase from 'firebase/app';
import { UserDetail } from './user-detail.mode';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user: User;
  customUser: UserDetail;

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  private userDetail = new BehaviorSubject<User>(null);
  public UserDetail$ = this.userDetail.asObservable();

  private customUserDetail = new BehaviorSubject<UserDetail>(null);
  public customUserDetail$ = this.customUserDetail.asObservable();

  setError(error) {
    this.eventAuthError.next(error);
  }

  setUserDetail(userDetail) {
    this.user = userDetail;
    this.userDetail.next(userDetail);
  }

  getUser(): User {
    return this.user;
  }

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        // localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        //localStorage.setItem('user', null);
      }
    });
  }

  getCustomUserDetail() {
    this.customUser = {
      uid: this.user.uid,
      email: this.user.email,
      firstName: this.user.displayName,
      lastName: this.user.displayName,
    };

    this.customUserDetail.next(this.customUser);
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  async signup(email: string, password: string) {
    this.eventAuthError.next(null);
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async sendEmailVerification() {
    this.eventAuthError.next(null);
    this.router.navigate(['admin/verify-email']);
  }

  async login(email: string, password: string) {
    this.eventAuthError.next(null);
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.eventAuthError.next(null);
    this.afAuth
      .signOut()
      .then((result) => {
        this.setUserDetail('');
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.setError(error);
      });
  }

  doFacebookLogin() {
    this.eventAuthError.next(null);
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  doGoogleLogin() {
    this.eventAuthError.next(null);
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  emailVerification() {
    this.eventAuthError.next(null);
    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then((value) => {
        console.log('email sent');
      })
      .catch((error) => {
        console.log();
      });
  }

  reSetPassword(email) {
    this.eventAuthError.next(null);
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    this.eventAuthError.next(null);
    return this.afAuth.signInWithPopup(provider);
  }
}

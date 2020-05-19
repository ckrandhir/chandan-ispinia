import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import ScrollOut from 'scroll-out';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from './../../features/auth-service.service';
import { auth, User } from 'firebase/app';
import { UserDetailService } from 'src/app/features/user-detail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseErrors } from 'src/app/features/user-detail.mode';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  resetForm: FormGroup;
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirm_password') confirm_password: ElementRef;
  @ViewChild('loginForm1') loginFormvalidation: ElementRef;
  @ViewChild('signUpvalidator') signUpvalidator: ElementRef;

  islogin: boolean = false;
  isSignUp: boolean = false;
  resetEmail: string;
  isforgetPassword: boolean = false;
  isgoogle: boolean = false;
  isFacebook: boolean = false;
  isemailVerification: boolean = false;
  isemailVerificationsignup: boolean = false;
  isEmailSent: boolean = false;
  user: User;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private auth: AuthServiceService,
    public router: Router,
    private route: ActivatedRoute,
    private userDetailService: UserDetailService
  ) {}
  authError: any;
  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe((data) => {
      if (data) {
        this.authError = FirebaseErrors.Parse(data['code']);
      } else {
        this.authError = null;
      }
    });

    ScrollOut({
      // onShown(el) {},
      // onHidden: function (element, ctx, scrollingElement) {},
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });

    this.resetForm = this.fb.group({
      email: ['', Validators.required],
    });
  }
  title = 'bloodBank';
  loginWithEmail() {
    this.isforgetPassword = false;
    this.islogin = true;
    this.isSignUp = false;
    this.isgoogle = false;
    this.isFacebook = false;
    this.isEmailSent = false;

    this.loginFormvalidation.nativeElement;

    this.auth
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        this.user = result.user;

        if (!this.user.emailVerified) {
          this.isemailVerification = true;
        } else {
          this.auth.setUserDetail(result.user);
          this.router.navigate(['home']);
        }

        //
      })
      .catch((error) => {
        this.auth.setError(error);
      });
  }

  loginWithGmail() {
    this.auth
      .doGoogleLogin()
      .then((result) => {
        this.isforgetPassword = false;
        this.islogin = true;
        this.isSignUp = false;
        this.isgoogle = true;
        this.isFacebook = false;
        this.isEmailSent = false;
        this.auth.setUserDetail(result.user);
        this.router.navigate(['home']);
        this.signUpForm.reset();
      })
      .catch((error) => {
        this.auth.setError(error);
        this.signUpForm.reset();
      });
  }

  resetPassword() {
    this.auth.reSetPassword(this.resetForm.value.email).then(
      () => {
        this.isforgetPassword = true;
        this.islogin = false;
        this.isSignUp = false;
        this.isgoogle = true;
        this.isFacebook = false;
        this.isEmailSent = false;
      },
      (err) => {
        this.isforgetPassword = true;
        this.islogin = false;
        this.isSignUp = false;
        this.isgoogle = true;
        this.isFacebook = false;
        this.auth.setError(err);
      }
    );
  }

  validatePassword() {
    if (
      this.password.nativeElement.value !=
      this.confirm_password.nativeElement.value
    ) {
      this.confirm_password.nativeElement.setCustomValidity(
        "Passwords Don't Match"
      );
    } else {
      this.confirm_password.nativeElement.setCustomValidity('');
    }
  }

  register() {
    if (
      this.signUpForm.valid &&
      this.signUpvalidator.nativeElement.checkValidity()
    ) {
      this.isforgetPassword = false;
      this.islogin = false;
      this.isEmailSent = false;

      if (this.authError) {
        this.isSignUp = true;
      }
      this.signUpvalidator.nativeElement;
      var obj = this.signUpForm.value;

      this.auth
        .signup(this.signUpForm.value.email, this.signUpForm.value.password)
        .then((result) => {
          this.userDetailService.createUserDetails(obj, result.user.uid);
          this.loginForm.reset();
          this.user = firebase.auth().currentUser;
          this.isemailVerificationsignup = true;
        })
        .catch((error) => {
          this.loginForm.reset();
          this.auth.setError(error);
        });
    }
  }

  emailVerification() {
    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then((value) => {
        this.isemailVerification = false;
        this.isemailVerificationsignup = false;
        this.isEmailSent = true;
      })
      .catch((error) => {});
  }

  loginWithFacebook() {
    this.isforgetPassword = false;
    this.islogin = false;
    this.isSignUp = false;
    this.isgoogle = false;
    this.isFacebook = true;
    this.isEmailSent = false;

    this.router.navigate(['home']);
    this.auth
      .doFacebookLogin()
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.auth.setUserDetail(result.user);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error);
        this.auth.setError(error);
      });
  }
}

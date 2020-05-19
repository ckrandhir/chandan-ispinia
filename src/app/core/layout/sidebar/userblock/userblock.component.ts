import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { User } from 'firebase';
import { AuthServiceService } from 'src/app/features/auth-service.service';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss'],
})
export class UserblockComponent implements OnInit {
  user: any;
  loginUSer: User;
  constructor(
    public userblockService: UserblockService,
    public auth: AuthServiceService
  ) {}

  ngOnInit() {
    this.auth.UserDetail$.subscribe((value) => {
      if (value) {
        this.loginUSer = value;
      }
    });
    console.log(this.loginUSer);

    this.user = {
      picture: this.loginUSer.photoURL,
      displayName: this.loginUSer.displayName,
    };
  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { UserDetail } from '../user-detail.mode';
import { UserDetailService } from 'src/app/features/user-detail.service';
import { User } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private userDetailServive: UserDetailService
  ) {}

  ngOnInit(): void {}
}

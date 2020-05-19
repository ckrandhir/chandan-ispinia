import { Component, OnInit, HostBinding } from '@angular/core';

import { Router } from '@angular/router';

import { UserDetailService } from 'src/app/features/user-detail.service';
import { User } from 'firebase';

import ScrollOut from 'scroll-out';
import { AuthServiceService } from './features/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SettingsService } from './core/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;

  @HostBinding('class.layout-fixed') get isFixed() {
    return this.settings.getLayoutSetting('isFixed');
  }
  @HostBinding('class.aside-collapsed') get isCollapsed() {
    return this.settings.getLayoutSetting('isCollapsed');
  }
  @HostBinding('class.layout-boxed') get isBoxed() {
    return this.settings.getLayoutSetting('isBoxed');
  }
  @HostBinding('class.layout-fs') get useFullLayout() {
    return this.settings.getLayoutSetting('useFullLayout');
  }
  @HostBinding('class.hidden-footer') get hiddenFooter() {
    return this.settings.getLayoutSetting('hiddenFooter');
  }
  @HostBinding('class.layout-h') get horizontal() {
    return this.settings.getLayoutSetting('horizontal');
  }
  @HostBinding('class.aside-float') get isFloat() {
    return this.settings.getLayoutSetting('isFloat');
  }
  @HostBinding('class.offsidebar-open') get offsidebarOpen() {
    return this.settings.getLayoutSetting('offsidebarOpen');
  }
  @HostBinding('class.aside-toggled') get asideToggled() {
    return this.settings.getLayoutSetting('asideToggled');
  }
  @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
    return this.settings.getLayoutSetting('isCollapsedText');
  }

  constructor(
    private auth: AuthServiceService,
    public afAuth: AngularFireAuth,
    public settings: SettingsService,
    private router: Router,
    private userDetailServive: UserDetailService
  ) {}

  ngOnInit(): void {
    this.auth.UserDetail$.subscribe((value) => {
      this.user = value;
    });

    // prevent empty links to reload the page
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' &&
        ['', '#'].indexOf(target.getAttribute('href')) > -1
      )
        e.preventDefault();
    });

    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     this.user = null;
    //   }
    // });

    // this.userDetailServive.getUser(this.user.uid).subscribe((value) => {
    //   if (value) {
    //     console.log(value.data());
    //   }
    // });
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { HomeComponent } from './features/home/home.component';
import { NoPageFoundComponent } from './features/no-page-found/no-page-found.component';
import { AuthGuard } from './features/auth.guard';
import { LoginGuard } from './features/login.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { MenuService, menu } from './core/menu/menu.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {
  constructor(public menuService: MenuService) {
    menuService.addMenu(menu);
  }
}

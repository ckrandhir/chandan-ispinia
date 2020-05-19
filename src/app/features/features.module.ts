import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';



@NgModule({
  declarations: [HomeComponent, NoPageFoundComponent],
  imports: [
    SharedModule
  ]
})
export class FeaturesModule { }

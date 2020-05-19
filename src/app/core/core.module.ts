import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [SharedModule, LayoutModule.forRoot()],
  exports: [LayoutModule],
  providers: [],
})
export class CoreModule {}

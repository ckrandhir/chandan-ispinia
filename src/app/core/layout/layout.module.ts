import { NgModule, ModuleWithProviders } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import { FooterComponent } from './footer/footer.component';
import { InspiniaModule } from 'src/app/inspinia/inspinia.module';
import { MenuService } from '../menu/menu.service';
import { SettingsService } from '../settings/settings.service';
import { ThemesService } from '../themes/themes.service';

@NgModule({
  imports: [InspiniaModule],
  providers: [UserblockService, MenuService, SettingsService,ThemesService],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent,
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent,
   
  ],

})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: [UserblockService, MenuService, SettingsService, ThemesService]
    };
  }
}

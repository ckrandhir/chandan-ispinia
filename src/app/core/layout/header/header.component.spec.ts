/* tslint:disable:no-unused-variable */

import { Injector } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderComponent } from './header.component';



describe('Component: Header', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [HttpClient]
                    }
                }),
                HttpClientModule
            ],
            providers: [MenuService, SettingsService, TranslatorService, Injector]
        }).compileComponents();
    });

    it('should create an instance', async(
        inject(
            [MenuService, SettingsService, TranslatorService, Injector],
            (menuService, settingsService, translator, injector) => {
                let component = new HeaderComponent(
                    menuService,
                    settingsService,
                    translator,
                    injector
                );
                expect(component).toBeTruthy();
            }
        )
    ));
});

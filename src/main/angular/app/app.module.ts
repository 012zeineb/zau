import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { DemoMaterialModule } from './demo-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DynamicFormsComponent } from './Dynamic-ChangeMail/Dynamic-ChangeMail.component';
import { MessagesComponent } from './messages/messages.component';
import { httpInterceptorProviders } from './http-interceptors';
import { createCustomElement } from '@angular/elements';
import { ConfigurationService } from './configuration.service';
import { DataTablesModule } from 'angular-datatables';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagePipe } from "./pipes/language.pipe";
import { LanguageInjectable } from "./LanguageInjectable";
import { UtilsService } from "./utils/utils.service";
import { UtilsComponent } from "./utils/utils.component";
import { LetterTransformPipe } from './pipes/transformLetter.pipe';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './i18n/');
}

@NgModule({
  declarations: [
    MessagesComponent,
    DynamicFormsComponent,
    LanguagePipe,
    UtilsComponent,
    LetterTransformPipe
  ],
  imports: [
    BrowserModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NativeDateModule,
    FontAwesomeModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ConfigurationService,
    LanguagePipe,
    LetterTransformPipe,
    LanguageInjectable,
    UtilsService,
    httpInterceptorProviders
  ],
  entryComponents: [
    DynamicFormsComponent
  ],
   //Uncomment bootstrap to run the TestComponent as an independent app
   //bootstrap: [TestComponent]
})

export class AppModule {
  // Comment out the constructor and ngDoBootstrap method when you want to bootstrap the TestComponent.

  constructor(private injector: Injector,translate: TranslateService) {
    console.info('Constructor Dynamic-ChangeMail')
    if (!customElements.get('Dynamic-ChangeMail')) {
      customElements.define('Dynamic-ChangeMail', createCustomElement(DynamicFormsComponent, { injector }));
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');
    }
  }
  ngDoBootstrap() {}
}

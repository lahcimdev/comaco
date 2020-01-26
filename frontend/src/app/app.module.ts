import { NavigationComponent } from './main/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LoginComponent } from './main/login/login.component';
import { UserState } from './state/user/user.state';
import { TokenInterceptor } from './service/interceptors/token-interceptor';
import { HeaderComponent } from './main/header/header.component';
import { IconImport } from './service/iconImport';
import { FooterComponent } from './main/footer/footer.component';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthorizationErrorComponent } from './main/errors/authorization-error/authorization-error.component';
import { CountdownModule } from 'ngx-countdown';



// import Cookies from 'js-cookie'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    AuthorizationErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    EmployeeModule,
    CustomerModule,

    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    CountdownModule
  ],
  providers: [IconImport,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
import { EmployeeState } from './state/employee/employee.state';
import { TokenInterceptor } from './service/interceptors/token-interceptor';
import { HeaderComponent } from './main/header/header.component';
import { IconImport } from './service/iconImport';
import { FooterComponent } from './main/footer/footer.component';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthorizationErrorComponent } from './main/errors/authorization-error/authorization-error.component';
import { CountdownModule } from 'ngx-countdown';
import { ErrorInterceptor } from './service/interceptors/error-interceptor';
import { ServerErrorComponent } from './main/errors/server-error/server-error.component';
import { CustomerState } from './state/customer/customer.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    AuthorizationErrorComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    EmployeeModule,
    CustomerModule,

    HttpClientModule,
    NgxsModule.forRoot([UserState, EmployeeState, CustomerState]),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

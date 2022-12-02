import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import fetchMock from 'fetch-mock';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ClinicianComponent } from './clinician/clinician.component';
import { PatientComponent } from './patient/patient.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

declare function initFetchMock(mockInstance: any): any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClinicianComponent,
    PatientComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(){
      initFetchMock(fetchMock);
    }   
}
  

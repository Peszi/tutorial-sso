import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from "./components/home/home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RequestService} from "./components/request.service";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";

const appRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', component: HomeComponent},
  { path: 'signin', component: SigninComponent },
  // {path: '**', component: IndexComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

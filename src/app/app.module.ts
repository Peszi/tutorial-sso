import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from './components/signin/signin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RequestService} from "./components/request.service";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import { NaviComponent } from './navi/navi.component';
import { IndexComponent } from './components/main/index/index.component';
import { HomeComponent } from './components/main/home.component';
import {UserComponent} from "./components/main/user/user.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'signin', component: SigninComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'index', pathMatch: 'full' },
      {path: 'index', component: IndexComponent },
      {path: 'user', component: UserComponent }
    ]
  },
  // {path: '**', component: IndexComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    NaviComponent,
    IndexComponent,
    HomeComponent
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

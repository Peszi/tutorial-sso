import { Component, OnInit } from '@angular/core';
import {RequestService} from "../components/request.service";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isLogged = false;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.authSubject.asObservable()
      .subscribe(
        (logged) => { this.isLogged = logged; }
      );
  }

  onSignIn() {
    window.location.href = 'http://localhost:8081/auth/oauth/authorize?response_type=code&client_id=fooClientId&redirect_uri=http://localhost:8081/auth/code';
  }

  onSignOut() {
    this.requestService.signOutRequest()
      .subscribe(
        () => {},
        () => {}
      );
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../request.service";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  response: string = 'loading..';
  isLogged = false;

  constructor(private requestService: RequestService,
              private route: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      if (param['code']) { this.onAuthCode(param['code']); }
      // this.message = param['status'] ? param['status'] : 'error'
    });
    this.requestService.authSubject.asObservable()
      .subscribe(
        (logged) => {
          if (logged) {
            this.message = this.requestService.accessToken;
            this.onData()
          }
        }
      );
    this.isLogged = !!this.cookieService.get('Idea-7f4db146');
  }

  onButton() {
    window.location.href = 'http://localhost:8081/auth/oauth/authorize?response_type=code&client_id=fooClientId&redirect_uri=http://localhost:8081/auth/code';
  }

  onPrint() {
    console.log(this.cookieService.getAll());
  }

  onAuthCode(code: string) {
    this.requestService.getAccessToken(code)
  }

  onData() {
    this.requestService.getData()
      .subscribe(
        (response) => {
          this.response = response;
        },
        () => {
          this.response = 'not AUTH!';
        }
      );
  }

}

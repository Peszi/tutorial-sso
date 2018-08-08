import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../request.service";
import {CookieService} from "ngx-cookie";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../request.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private requestService: RequestService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    this.requestService.signInRequest({ name: this.loginForm.value.name, password: this.loginForm.value.password })
      .subscribe(
        (code) => { this.onReturn(code); },
              () => { console.log('incorrect credentials!'); }
        // TODO show incorrect credentials
        );
  }

  onReturn(code: string) {
    this.router.navigate(['../index'], { queryParams: { code: code } });
  }
}

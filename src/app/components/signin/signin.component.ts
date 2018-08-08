import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../request.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loggingError: boolean;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
    this.loginForm.valueChanges.subscribe(
      () => { this.loggingError = false; }
    );
  }

  onSubmit() {
    this.requestService.signInRequest({ name: this.loginForm.value.name, password: this.loginForm.value.password })
      .subscribe(
        () => {},
        () => { this.loggingError = true; }
      );
  }
}

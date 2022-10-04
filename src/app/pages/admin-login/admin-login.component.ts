import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private route: Router) {}
  loginForm!: FormGroup;
  loginErr:boolean=false;
  ngOnInit() {
     
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  resData: any;
  onSubmit() {
    console.log(this.loginForm.value)
    if (
      this.loginForm.value.email == "admin@promantus.com" &&
      this.loginForm.value.password == "admin"
    ) {
      this.loginErr=false
      this.loginForm.reset();
      this.route.navigateByUrl("/admin-dashboard");
    } else {
      this.loginErr=true
      this.route.navigateByUrl("/admin-login");
    }
  }
}

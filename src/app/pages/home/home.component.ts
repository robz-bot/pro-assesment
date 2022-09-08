import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { buttonValue, message, patterns } from "src/app/common";
import { HomeService } from "./home.service";
import { register } from "./register";
import { team } from "./team";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private route: Router) {}

  registerForm!: FormGroup;
  registerValue: register = new register();
  isEmpCodeValid: boolean = true;
  isEmailValid: boolean = true;
  teamList: any;
  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      empCode: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      manager: new FormControl("", [Validators.required]),
      teamId: new FormControl("", [Validators.required]),
    });

    this.getAllTeams();
  }

  getAllTeams() {
    this.homeService.getAllTeams().subscribe((data) => {
      console.log(data);
      this.teamList = data;
    });
  }

  resData: any;
  submitBtnValue: string = buttonValue.START_ASSESS;
  errMsg: string = "";
  acceptTC: string = "";
  onSubmit() {
    this.errMsg = "";
    this.submitBtnValue = buttonValue.LOADING_ASSESS;
    this.registerValue = this.registerForm.value;
    console.log(this.registerValue);
    this.registerValue.empCode = this.registerForm.value.empCode;
    if (!patterns.EMAIL_PATTERN.test(this.registerValue.email)) {
      this.isEmailValid = false;
      this.submitBtnValue = buttonValue.START_ASSESS;
      return;
    }
    if (!patterns.EMPCODE_PATTERN.test(this.registerValue.empCode)) {
      this.isEmpCodeValid = false;
      this.submitBtnValue = buttonValue.START_ASSESS;
      return;
    }

    this.registerValue.empCode = this.registerValue.empCode.toUpperCase();
    this.registerValue.email = this.registerValue.email.trim();
    Swal.fire({
      title: "Terms and conditions",
      html: `1. There are 30 overall questions<br>
             2. Each question carries 1 mark<br>
             3. Once an assessment has begun, it cannot be stopped`,
      input: "checkbox",
      inputPlaceholder: "I agree with the terms and conditions",
      showDenyButton: true,
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.saveUser();
        } else {
          this.submitBtnValue = buttonValue.START_ASSESS;
          Swal.fire({ icon: "error", text: "You are not accepted :(" });
        }
      } else {
        this.submitBtnValue = buttonValue.START_ASSESS;
        return;
      }
    });
  }

  private saveUser() {
    this.homeService.addUser(this.registerValue).subscribe(
      (data) => {
        this.resData = data;
        console.log("After saving in DB(user): ");
        console.log(this.resData);
        if (this.resData.status == 0) {
          this.route.navigateByUrl("/assessment");
          this.savedInSession(this.registerValue);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.resData.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.errMsg = this.resData.message;
          this.submitBtnValue = buttonValue.START_ASSESS;
          this.registerForm.reset();
        }
      },
      (err) => {
        console.log("Error :");
        console.log(err);
        this.errMsg = message.SOMETHING_WRONG;
        this.submitBtnValue = buttonValue.START_ASSESS;
      }
    );
  }

  savedInSession(form: register) {
    sessionStorage.setItem("email", form.email);
    sessionStorage.setItem("empcode", form.empCode);
    sessionStorage.setItem("teamId", form.teamId);
  }
}

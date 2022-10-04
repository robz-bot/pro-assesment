import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-admin-request",
  templateUrl: "./admin-request.component.html",
  styleUrls: ["./admin-request.component.css"],
})
export class AdminRequestComponent implements OnInit {
  constructor(private route: Router, private homeService: HomeService) {}
  loginForm!: FormGroup;
  loginErr: boolean = false;
  ngOnInit() {
    this.getAllTeams();
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      teamId: new FormControl("", [Validators.required]),
      reason: new FormControl("", [Validators.required]),
    });
  }
  teamList: any[] = [];
  getAllTeams() {
    this.homeService.getAllTeams().subscribe((data) => {
      console.log(data);
      this.teamList = data;
    });
  }
  resData: any;
  onSubmit() {
    console.log(this.loginForm.value);
    if (
      this.loginForm.value.email == "admin@promantus.com" &&
      this.loginForm.value.password == "admin"
    ) {
      this.loginErr = false;
      this.loginForm.reset();
      this.route.navigateByUrl("/admin-dashboard");
    } else {
      this.loginErr = true;
      this.route.navigateByUrl("/admin-login");
    }
  }
}

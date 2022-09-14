import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  todayDateTime: string = "";
  constructor() {}

  SS_empCode: any;
  SS_email: any;
  SS_manager: any;
  SS_team: any;
  ngOnInit(): void {
    this.SS_empCode = sessionStorage.getItem("empCode");
    this.SS_email = sessionStorage.getItem("email");
    this.SS_manager = sessionStorage.getItem("manager");
    this.SS_team = sessionStorage.getItem("team");
    const now = new Date();
    this.todayDateTime = now.toLocaleString();
  }
}

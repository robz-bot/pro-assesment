import { Component, OnInit } from "@angular/core";
import { baseUrl } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.css"],
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private alert: AlertifyService
  ) {}

  role:any
  email:any
  teamId:any
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role")?.toString()
    if(this.role == 'A')
      this.email = sessionStorage.getItem("email")?.toString()
    else
      this.email = "Super Admin"
  }

  createTeam() {
    Swal.fire({
      title: "Add team",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (teamName) => {
        let team = teamName.trim();
        if(team==""){
          Swal.showValidationMessage(`Team is required!`);
        }
        return fetch(`${baseUrl.BASE_URL}addTeam/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team: team }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        //Error
        if (result.value.status == 1) {
          Swal.fire({
            title: result.value.message,
            icon: "error",
          }).then((result) => {
            if(result.isConfirmed) {
              this.createTeam();
            }
          });
        } else {
          this.alert.customSuccessMsgWithoutBtn(result.value.message);
        }
      }
    });
  }
}

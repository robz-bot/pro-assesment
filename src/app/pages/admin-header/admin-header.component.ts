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

  ngOnInit(): void {}

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
            title: "Team is required",
            icon: "error",
            timer: 1500,
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

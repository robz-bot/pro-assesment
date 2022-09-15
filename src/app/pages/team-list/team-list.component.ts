import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { baseUrl, message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { HomeService } from "../home/home.service";
import { team } from "../home/team";

@Component({
  selector: "app-team-list",
  templateUrl: "./team-list.component.html",
  styleUrls: ["./team-list.component.css"],
})
export class TeamListComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
  }

  teamList: any;
  getAllTeams() {
    this.alert.showLoading();
    this.homeService.getAllTeams().subscribe(
      (data) => {
        Swal.close();
        console.log(data);
        this.teamList = data;
      },
      (err) => {
        console.log("Error :");
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: message.SOMETHING_WRONG,
          text: err,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  swalWithBootstrapButtons: any = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  updateTeam(item: any) {
    Swal.fire({
      title: "Edit team",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      inputValue: item.team,
      preConfirm: (inputValue) => {
        return fetch(`${baseUrl.BASE_URL}updateTeam/`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ team: inputValue, id: item.id }),
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
        this.alert.customSuccessMsgWithoutBtn(result.value.message);
        this.getAllTeams();
      }
    });
  }

  deleteTeamById(item: any) {
    this.swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.callingDeleteService(item.id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire(
            "Cancelled",
            "Question is safe :)",
            "info"
          );
        }
      });
  }

  callingDeleteService(qnId: string) {
    this.homeService.deleteTeamById(qnId).subscribe((data) => {
      console.log(data);
      this.alert.customSuccessMsgWithoutBtn("Deleted!");
      this.getAllTeams();
    });
  }

  searchKey: string = "";
  searchByTeamId(f: NgForm) {
    console.log(f);
    if (f.value.searchKey == "") {
      this.alert.customErrMsgWithoutBtn("Team is required");
      return;
    }
    this.homeService.searchByTeamId(f.value.searchKey).subscribe((data) => {
      console.log(data);
      this.teamList = data;
    },
    (err) => {
      console.log("Error :");
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: message.SOMETHING_WRONG,
        text: err,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}

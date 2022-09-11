import { Component, OnInit } from "@angular/core";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { GeneralService } from "../add-gen-qn/general.service";

@Component({
  selector: "app-gen-qn-list",
  templateUrl: "./gen-qn-list.component.html",
  styleUrls: ["./gen-qn-list.component.css"],
})
export class GenQnListComponent implements OnInit {
  constructor(
    private genService: GeneralService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllGeneralQuestions();
  }

  generalList: any = [];
  getAllGeneralQuestions() {
    this.alert.showLoading();
    this.genService.getAllGeneralQuestions().subscribe(
      (data) => {
        Swal.close();
        console.log(data);
        this.generalList = data;
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

  deleteGeneralQuestionById(qnId: string) {
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
          this.callingDeleteService(qnId);
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
    this.genService.deleteGeneralQuestionById(qnId).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.message,
      }).then((result) => {
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
          Swal.close();
          this.getAllGeneralQuestions();
        }
      });
    });
  }
}

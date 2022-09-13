import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { GeneralService } from "../add-gen-qn/general.service";
import { ReportService } from "./report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllReports();
  }

  reportList: any = [];
  getAllReports() {
    this.clearFields();
    this.alert.showLoading();
    this.reportService.getAllReports().subscribe(
      (data) => {
        Swal.close();
        console.log(data);
        this.reportList = data;
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

  searchKey: string = "";
  optionType: string = "";
  search(f: NgForm) {
    if (this.optionType == "") {
      this.alert.customErrMsgWithoutBtn("Select any one option");
      return;
    }
    if (this.searchKey == "") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }

    this.alert.showLoading();
    this.reportService.search(this.searchKey).subscribe((data) => {
      console.log(data);
      Swal.close();
      this.reportList = data;
    });
  }

  clearFields() {
    this.searchKey = "";
    this.optionType = "";
  }
}

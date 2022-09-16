import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as FileSaver from "file-saver";
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

  isEnableStatus: boolean = false;
  isEnablePercent: boolean = false;
  isEnableReportDate: boolean = false;
  isEnableSearchText: boolean = true;
  onChangeStatus(event: any) {
    if (event == "status") {
      this.isEnableStatus = true;
      this.isEnableSearchText = false;
      this.isEnablePercent = false;
      this.isEnableReportDate = false;
    } else if (event == "username" || event == "attempts") {
      this.isEnableStatus = false;
      this.isEnableSearchText = true;
      this.isEnablePercent = false;
      this.isEnableReportDate = false;
    } else if (event == "percentage") {
      this.isEnableStatus = false;
      this.isEnableSearchText = false;
      this.isEnablePercent = true;
      this.isEnableReportDate = false;
    } else if (event == "date") {
      this.isEnableStatus = false;
      this.isEnableSearchText = false;
      this.isEnablePercent = false;
      this.isEnableReportDate = true;
    }
  }

  searchKey: string = "";
  searchType: string = "";
  search(f: NgForm) {
    if (this.searchType == "") {
      this.alert.customErrMsgWithoutBtn("Select any one option");
      return;
    }
    if (this.searchKey == "" && this.searchType == "username") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    if (this.searchKey == "" && this.searchType == "attempts") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    if (this.searchKey == "" && this.searchType == "status") {
      this.alert.customErrMsgWithoutBtn("Select Status");
      return;
    }
    if (this.searchKey == "" && this.searchType == "percentage") {
      this.alert.customErrMsgWithoutBtn("Select percentage range");
      return;
    }
    if (this.searchKey == "" && this.searchType == "date") {
      this.alert.customErrMsgWithoutBtn("Held On date is Required");
      return;
    }
    console.log(this.searchType);
    console.log(this.searchKey);
    this.alert.showLoading();
    this.reportService
      .search(this.searchType, this.searchKey)
      .subscribe((data) => {
        console.log(data);
        Swal.close();
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
      });
  }

  downloadReports() {
    if(this.reportList.length <1 ){
      this.alert.customErrMsgTitle("No records to download as Excel")
      return
    }
    this.alert.showLoading();
    console.log(this.reportList);
    this.reportService
      .downloadReports(this.reportList)
      .subscribe((data) => {
        console.log(data);
        Swal.close();
        this.saveAsBlob(data);
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
  saveAsBlob(data: any) {
    FileSaver.saveAs(
      new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'Report_' + this.getCurrentDateTime() + '.xlsx'
    );
  }
  getCurrentDateTime(): any {
    const pipe = new DatePipe('en-US');
    return pipe.transform(new Date(), 'yyyyMMddhhmmss');
  }

  clearFields() {
    this.isEnableStatus = false;
    this.isEnableSearchText = true;
    this.isEnablePercent = false;
    this.isEnableReportDate = false;
    this.searchKey = "";
    this.searchType = "";
  }
}

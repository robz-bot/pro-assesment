import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { commonFunctions, message } from "src/app/common";
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
    this.getAllGeneralQuestionsPage();
    // this.getAllGeneralQuestions();
  }

  generalList: any = [];
  getAllGeneralQuestions() {
    this.clearFields();
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

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
    if (this.isSearchEnabled) {
      this.searchByGenQn();
    } else {
      this.getAllGeneralQuestionsPage();
    }
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    if (this.isSearchEnabled) {
      this.searchByGenQn();
    } else {
      this.getAllGeneralQuestionsPage();
    }
  }

  getRequestParams(page: number, pageSize: number) {
    if (page) {
      this.params[`page`] = page - 1;
    }

    if (pageSize) {
      this.params[`size`] = pageSize;
    }

    return this.params;
  }

  getAllGeneralQuestionsPage() {
    this.isSearchEnabled = false;
    const params = this.getRequestParams(this.page, this.pageSize);
    this.clearFields();
    this.alert.showLoading();
    this.genService.getAllGeneralQuestionsPage(params).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        const { generalQns, totalItems } = data;
        this.generalList = generalQns;
        this.count = totalItems;
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
        title: message.ALERT_TITLE,
        text: message.DELETE_TEXT,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: message.CONFIRM_DELETE_BTN,
        cancelButtonText: message.CANCEL_BTN,
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

  inactiveGeneralQuestionById(qnId: string) {
    this.swalWithBootstrapButtons
      .fire({
        title: message.ALERT_TITLE,
        text: message.INACTIVE_TEXT,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: message.CONFIRM_INACTIVE_BTN,
        cancelButtonText: message.CANCEL_BTN,
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.callingInactiveService(qnId);
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
          this.getAllGeneralQuestionsPage();
        }
      });
    });
  }

  callingInactiveService(qnId: string) {
    this.genService.inactiveGeneralQuestionById(qnId).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.message,
      }).then((result) => {
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
          Swal.close();
          this.getAllGeneralQuestionsPage();
        }
      });
    });
  }

  isSearchEnabled: boolean = false;
  searchKey: string = "";
  searchType: string = "";
  searchByGenQn() {
    this.isSearchEnabled = true;

    if (this.searchType == "") {
      this.alert.customErrMsgWithoutBtn("Select any one option");
      return;
    }
    if (this.searchKey == "") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    const params = this.getRequestParams(this.page, this.pageSize);
    this.alert.showLoading();
    this.genService
      .searchGenQnPage(this.searchType, this.searchKey, params)
      .subscribe(
        (data: any) => {
          console.log(data);
          const { currentPage, generalQns, totalItems } = data;
          this.generalList = generalQns;
          this.count = totalItems;
          this.page = currentPage + 1;
          Swal.close();
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

  clearFields() {
    this.searchKey = "";
    this.searchType = "";

  }
}

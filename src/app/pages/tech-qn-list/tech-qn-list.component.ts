import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { GeneralService } from "../add-gen-qn/general.service";
import { TechService } from "../add-tech-qn/tech.service";

@Component({
  selector: "app-tech-qn-list",
  templateUrl: "./tech-qn-list.component.html",
  styleUrls: ["./tech-qn-list.component.css"],
})
export class TechQnListComponent implements OnInit {
  constructor(
    private techService: TechService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllTechQuestionsPage();
  }

  techList: any = [];
  getAllTechQuestions() {
    this.clearFields();
    this.alert.showLoading();
    this.techService.getAllTechQuestions().subscribe(
      (data) => {
        Swal.close();
        console.log(data);
        this.techList = data;
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
    this.getAllTechQuestionsPage();
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllTechQuestionsPage();
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

  getAllTechQuestionsPage() {
    this.clearFields();
    const params = this.getRequestParams(this.page, this.pageSize);
    this.alert.showLoading();
    this.techService.getAllTechQuestionsPage(params).subscribe(
      (data:any) => {
        Swal.close();
        console.log(data);
        const { techQns, totalItems } = data;
        this.techList = techQns;
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

  deleteTechQuestionById(qnId: string) {
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
    this.techService.deleteTechQuestionById(qnId).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.message,
      }).then((result) => {
        console.log(result.isConfirmed);
        if (result.isConfirmed) {
          Swal.close();
          this.getAllTechQuestionsPage();
        }
      });
    });
  }

  searchKey: string = "";
  searchType: string = "";
  searchByTechQn(f: NgForm) {
    if (this.searchType == "") {
      this.alert.customErrMsgWithoutBtn("Select any one option");
      return;
    }
    if (this.searchKey == "") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }

    this.alert.showLoading();
    this.techService.search(this.searchType, this.searchKey).subscribe(
      (data) => {
        console.log(data);
        Swal.close();
        this.techList = data;
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

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { GeneralService } from "../add-gen-qn/general.service";
import { TechService } from "../add-tech-qn/tech.service";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-tech-qn-list",
  templateUrl: "./tech-qn-list.component.html",
  styleUrls: ["./tech-qn-list.component.css"],
})
export class TechQnListComponent implements OnInit {
  constructor(
    private techService: TechService,
    private alert: AlertifyService,
    private homeService: HomeService
  ) {}

  teamId:any
  role:any
  ngOnInit(): void {
    this.getAllTechQuestionsPage();
    this.getAllTeams();
    this.teamId = sessionStorage.getItem("teamId")?.toString()
    this.role = sessionStorage.getItem("role")?.toString()
  }
  isEnableTeam: boolean = false;
  isEnableSearchText: boolean = true;
  onChangeStatus(event: any) {
    
    if (event == "team") {
      this.isEnableTeam = true;
      this.isEnableSearchText = false;
    } else {
      this.searchKey=""
      this.isEnableTeam = false;
      this.isEnableSearchText = true;
    }
  }

  teamList: any;
  getAllTeams() {
    this.alert.showLoading();
    this.homeService.getAllTeams().subscribe(
      (data) => {
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

  techList: any = [];
  getAllTechQuestions() {
    this.clearFields();
    this.alert.showLoading();
    this.techService.getAllTechQuestions().subscribe(
      (data) => {
        console.log(data);
        this.techList = data;
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

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
    if (this.isSearchEnabled) {
      this.searchtechQnsPage();
    } else {
      this.getAllTechQuestionsPage();
    }
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
    this.isSearchEnabled = false;
    this.clearFields();
    const params = this.getRequestParams(this.page, this.pageSize);
    this.alert.showLoading();
    this.techService.getAllTechQuestionsPage(params).subscribe(
      (data: any) => {
        console.log(data);
        const { techQns, totalItems } = data;
        this.techList = techQns;
        this.count = totalItems;
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

  inactiveTechQuestionById(qnId: string) {
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

  callingInactiveService(qnId: string) {
    this.techService.inactiveTechQuestionById(qnId).subscribe((data: any) => {
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

  isSearchEnabled: boolean = false;
  searchtechQnsPage() {
    this.isSearchEnabled = true;
    if (this.searchType == "") {
      this.alert.customErrMsgWithoutBtn("Select any one option");
      return;
    }
    if (this.searchKey == "" && this.searchType == "question") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    if (this.searchKey == "" && this.searchType == "optionns") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    if (this.searchKey == "" && this.searchType == "answer") {
      this.alert.customErrMsgWithoutBtn("Keyword is Required");
      return;
    }
    if (this.searchKey == "" && this.searchType == "team") {
      this.alert.customErrMsgWithoutBtn("Team is Required");
      return;
    }
    const params = this.getRequestParams(this.page, this.pageSize);

    this.alert.showLoading();
    this.techService
      .searchtechQnsPage(this.searchType, this.searchKey, params)
      .subscribe(
        (data: any) => {
          console.log(data);
          const { currentPage, techQns, totalItems } = data;
          this.techList = techQns;
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

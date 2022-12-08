import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { baseUrl, message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { DashboardService } from "../admin-dashboard/dashboard.service";
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
    private alert: AlertifyService,
    private dashboardService:DashboardService
  ) {}

  @ViewChild('marqueeId') marqueeId!: ElementRef ;

  ngOnInit(): void {
    // this.getAllTeams();
    this.role = sessionStorage.getItem("role")?.toString()
    this.teamExamReadiness()
  }
  // ngAfterViewInit(){
  //   this.marqueeId.nativeElement.scrollAmount = 2
  // }
  startMarquee(){
    this.marqueeId.nativeElement.scrollAmount = 2
  }
  stopMarquee(){
    this.marqueeId.nativeElement.scrollAmount = 0
  }
  role:any
  errList:any
  liveList:any
  teamExamReadiness(){
    this.alert.showLoading();
    this.dashboardService.teamExamReadiness().subscribe(
      (data:any) => {
        Swal.close();
        console.log(data);
        const { errList, liveList } = data;
        this.errList = errList;
        this.liveList = liveList;

        this.getAllTeamsPage();
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
  pageSize = 8;
  pageSizes = [8,16,28];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
    this.getAllTeamsPage();
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllTeamsPage();
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

  getRequestParams(page: number, pageSize: number) {
    if (page) {
      this.params[`page`] = page - 1;
    }

    if (pageSize) {
      this.params[`size`] = pageSize;
    }

    return this.params;
  }

  getAllTeamsPage() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.alert.showLoading();
    this.homeService.getAllTeamsPage(params).subscribe(
      (data:any) => {
        Swal.close();
        console.log(data);
        const { teams, totalItems } = data;
        this.teamList = teams;
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

  updateTeam(item: any) {
    Swal.fire({
      title: "Edit team",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      inputValue: item.team,
      preConfirm: (inputValue) => {
        if(inputValue==""){
          Swal.showValidationMessage(`Team is required!`);
        }
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
        this.getAllTeamsPage();
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
      this.getAllTeamsPage();
    });
  }

  searchKey: string = "";
  searchByTeamId(f: NgForm) {
    console.log(f);
    if (f.value.searchKey == "") {
      this.alert.customErrMsgWithoutBtn("Team is required");
      return;
    }
    this.homeService.searchByTeamId(f.value.searchKey).subscribe(
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
}

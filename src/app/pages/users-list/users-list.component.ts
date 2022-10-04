import { Component, OnInit } from '@angular/core';
import { message } from 'src/app/common';
import { AlertifyService } from 'src/app/shared-service/alertify.service';
import Swal from 'sweetalert2';
import { HomeService } from '../home/home.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private alert: AlertifyService,
    private homeService:HomeService
  ) {}

  ngOnInit(): void {
    this.getAllUsersPage();
    this.getAllTeams()
    // this.getAllGeneralQuestions();
  }

  userList: any = [];

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


  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
    if (this.isSearchEnabled) {
      this.searchByUser();
    } else {
      this.getAllUsersPage();
    }
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    if (this.isSearchEnabled) {
      this.searchByUser();
    } else {
      this.getAllUsersPage();
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

  getAllUsersPage() {
    this.isSearchEnabled = false;
    const params = this.getRequestParams(this.page, this.pageSize);
    this.clearFields();
    this.alert.showLoading();
    this.userService.getAllUsersPage(params).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        const { userList, totalItems } = data;
        this.userList = userList;
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
          // this.callingDeleteService(qnId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire(
            "Cancelled",
            "Question is safe :)",
            "info"
          );
        }
      });
  }

  // callingDeleteService(qnId: string) {
  //   this.genService.deleteGeneralQuestionById(qnId).subscribe((data: any) => {
  //     console.log(data);
  //     Swal.fire({
  //       title: data.message,
  //     }).then((result) => {
  //       console.log(result.isConfirmed);
  //       if (result.isConfirmed) {
  //         Swal.close();
  //         this.getAllUsersPage();
  //       }
  //     });
  //   });
  // }

  isSearchEnabled: boolean = false;
  searchKey: string = "";
  searchType: string = "";
  searchByUser() {
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
    this.userService
      .search(this.searchType, this.searchKey, params)
      .subscribe(
        (data: any) => {
          console.log(data);
          const { currentPage, userList, totalItems } = data;
          this.userList = userList;
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

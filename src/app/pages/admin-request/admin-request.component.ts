import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { AdminService } from "../admin-login/admin.service";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-admin-request",
  templateUrl: "./admin-request.component.html",
  styleUrls: ["./admin-request.component.css"],
})
export class AdminRequestComponent implements OnInit {
  constructor(
    private route: Router,
    private adminService: AdminService,
    private alert: AlertifyService
  ) {}
  loginForm!: FormGroup;
  loginErr: boolean = false;
  ngOnInit() {
    this.getAllAdminRequest();
  }
  page = 1;
  count = 0;
  pageSize = 8;
  pageSizes = [8, 16, 28];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  adminRequestList: any;
  getAllAdminRequest() {
    this.alert.showLoading();
    this.adminService.getAllAdminRequest().subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);
        const { adminRequestList, count } = data;
        this.adminRequestList = adminRequestList;
        this.count = count;
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

  onchangeApproveOrDecline(item: any, req: string) {
    this.adminService
      .adminApproveOrDecline(item, req)
      .subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          position: "center",
          icon: data.icon,
          title: "",
          text: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
}

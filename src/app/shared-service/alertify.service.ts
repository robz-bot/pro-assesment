import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root",
})
export class AlertifyService {
  constructor() {}

  customErrMsgTitle(message: string) {
    Swal.fire({
      title: message,
      icon: "error",
    });
  }
  customErrMsgWithoutBtn(message: string) {
    Swal.fire({
      title: message,
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  customWarningMsgWithoutBtn(message: string) {
    Swal.fire({
      title: message,
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  customSuccessMsgWithoutBtn(message: string) {
    Swal.fire({
      title: message,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showLoading() {
    Swal.fire({
      title: "Loading...!",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  hideLoading() {
    Swal.fire({
      didOpen: () => {
        Swal.disableButtons();
      },
      timer: 1200,
    });
  }
}

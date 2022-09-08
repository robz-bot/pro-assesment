import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
@Injectable({
  providedIn: "root",
})
export class AlertifyService {
  constructor() {}

  default(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a routerLink="/">Why do I have this issue?</a>'
    })
  }
}

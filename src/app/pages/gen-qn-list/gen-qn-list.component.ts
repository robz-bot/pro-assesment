import { Component, OnInit } from "@angular/core";
import { message } from "src/app/common";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { GeneralService } from "../add-gen-qn/general.service";

@Component({
  selector: "app-gen-qn-list",
  templateUrl: "./gen-qn-list.component.html",
  styleUrls: ["./gen-qn-list.component.css"],
})
export class GenQnListComponent implements OnInit {
  constructor(private genService: GeneralService) {}

  ngOnInit(): void {
    this.getAllGeneralQuestions();
  }

  generalList: any = [];
  getAllGeneralQuestions() {
    this.genService.getAllGeneralQuestions().subscribe(
      (data) => {
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
}

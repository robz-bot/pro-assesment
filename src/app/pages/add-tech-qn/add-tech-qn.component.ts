import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-add-tech-qn",
  templateUrl: "./add-tech-qn.component.html",
  styleUrls: ["./add-tech-qn.component.css"],
})
export class AddTechQnComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private alertify: AlertifyService
  ) {}
  teamList: any;
  genQnForm!: FormGroup;
  genQnValue: generalQn = new generalQn();
  correctAnswerByCopyPaste: string = "";
  ngOnInit(): void {
    this.genQnForm = new FormGroup({
      question: new FormControl("", [Validators.required]),
      option1: new FormControl("", [Validators.required]),
      option2: new FormControl("", [Validators.required]),
      option3: new FormControl("", [Validators.required]),
      option4: new FormControl("", [Validators.required]),
      answer: new FormControl("", [Validators.required]),
      teamId: new FormControl("", [Validators.required]),
    });

    this.getAllTeams();
  }

  getAllTeams() {
    this.homeService.getAllTeams().subscribe((data) => {
      console.log(data);
      this.teamList = data;
    });
  }

  copyAndPopulate(choice: string) {
    this.genQnValue = this.genQnForm.value;
    if (choice == "option1") {
      this.correctAnswerByCopyPaste = this.genQnValue.option1;
      this.genQnValue.answer = this.genQnValue.option1;
    } else if (choice == "option2") {
      this.correctAnswerByCopyPaste = this.genQnValue.option2;
      this.genQnValue.answer = this.genQnValue.option2;
    } else if (choice == "option3") {
      this.correctAnswerByCopyPaste = this.genQnValue.option3;
      this.genQnValue.answer = this.genQnValue.option3;
    } else if (choice == "option4") {
      this.correctAnswerByCopyPaste = this.genQnValue.option4;
      this.genQnValue.answer = this.genQnValue.option4;
    }
  }

  onSubmit() {
    this.genQnValue = this.genQnForm.value;
    console.log(this.genQnValue);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}

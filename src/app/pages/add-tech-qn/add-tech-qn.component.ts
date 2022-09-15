import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { commonFunctions, message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { GeneralService } from "../add-gen-qn/general.service";
import { HomeService } from "../home/home.service";
import { TechService } from "./tech.service";

@Component({
  selector: "app-add-tech-qn",
  templateUrl: "./add-tech-qn.component.html",
  styleUrls: ["./add-tech-qn.component.css"],
})
export class AddTechQnComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private techService: TechService,
    private alert: AlertifyService,
    private router: Router
  ) {}
  teamList: any;
  techQnForm!: FormGroup;
  techQnValue: generalQn = new generalQn();
  correctAnswerByCopyPaste: string = "";
  ngOnInit(): void {
    this.techQnForm = new FormGroup({
      question: new FormControl("", [Validators.required]),
      option1: new FormControl("", [Validators.required]),
      option2: new FormControl("", [Validators.required]),
      option3: new FormControl("", [Validators.required]),
      option4: new FormControl("", [Validators.required]),
      answer: new FormControl("", [Validators.required]),
      teamId: new FormControl("", [Validators.required]),
      mulQn: new FormControl(false, [Validators.required]),
    });

    this.getAllTeams();
  }

  getAllTeams() {
    this.homeService.getAllTeams().subscribe((data) => {
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
    });
  }

  copyAndPopulate(choice: string) {
    this.techQnValue = this.techQnForm.value;
    if (choice == "option1") {
      this.correctAnswerByCopyPaste = this.techQnValue.option1;
      this.techQnValue.answer = this.techQnValue.option1;
    } else if (choice == "option2") {
      this.correctAnswerByCopyPaste = this.techQnValue.option2;
      this.techQnValue.answer = this.techQnValue.option2;
    } else if (choice == "option3") {
      this.correctAnswerByCopyPaste = this.techQnValue.option3;
      this.techQnValue.answer = this.techQnValue.option3;
    } else if (choice == "option4") {
      this.correctAnswerByCopyPaste = this.techQnValue.option4;
      this.techQnValue.answer = this.techQnValue.option4;
    }
  }

  goBack() {
    history.back();
  }

  onSubmit() {
    this.techQnValue = this.techQnForm.value;
    this.techQnValue.answer = this.correctAnswerByCopyPaste;

    if (this.techQnValue.question == "") {
      this.alert.customWarningMsgWithoutBtn("Question is required!");
      return;
    }
    if (this.techQnValue.option1 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 1 is required!");
      return;
    }
    if (this.techQnValue.option2 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 2 is required!");
      return;
    }
    if (this.techQnValue.option3 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 3 is required!");
      return;
    }
    if (this.techQnValue.option4 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 4 is required!");
      return;
    }
    if (this.techQnValue.teamId == "") {
      this.alert.customWarningMsgWithoutBtn("Team is required!");
      return;
    }
    console.log(this.techQnValue.answer);
    if (this.techQnValue.answer == "") {
      this.alert.customWarningMsgWithoutBtn("Answer is required!");
      return;
    }
    //To check answer
    // if (!this.checkDuplicateAnswer(this.techQnValue)) {
    //   this.alert.customWarningMsgWithoutBtn("Incorrect Answer is chosen!");
    //   return;
    // }
    if (this.checkDuplicateOptions(this.techQnValue)) {
      console.log(this.techQnValue);

      this.alert.showLoading();
      this.techService
        .addTechQuestion(this.techQnValue)
        .subscribe((data: any) => {
          Swal.close();
          console.log(data);

          //After added
          Swal.fire({
            title: data.message,
            showDenyButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              if (!this.techQnForm.value.mulQn) {
                this.router.navigateByUrl("/tech-qn-list");
              } else {
                this.techQnForm.reset();
              }
            }
          });
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
        });
    }
  }

  checkDuplicateAnswer(techQnValue: generalQn): boolean {
    let optionsArr = [
      techQnValue.option1,
      techQnValue.option2,
      techQnValue.option3,
      techQnValue.option4,
    ];

    var isRightAnswer = false

    optionsArr.forEach((element: any) => {
      if (element == techQnValue.answer) {
        isRightAnswer = true
      } else {
        isRightAnswer = false
      }
    });
    return isRightAnswer;
  }

  checkDuplicateOptions(techQnValue: generalQn): boolean {
    let optionsArr = [
      techQnValue.option1,
      techQnValue.option2,
      techQnValue.option3,
      techQnValue.option4,
    ];

    const found = optionsArr.find((element) => {
      return element.toLowerCase() === techQnValue.answer.toLowerCase();
    });

    if (found == undefined || found == "") {
      return false;
    }
    return true;
  }
}

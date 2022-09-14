import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import { HomeService } from "../home/home.service";
import { generalQn } from "./gen-qn";
import { GeneralService } from "./general.service";
import { commonFunctions } from "src/app/common";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-gen-qn",
  templateUrl: "./add-gen-qn.component.html",
  styleUrls: ["./add-gen-qn.component.css"],
})
export class AddGenQnComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private genService: GeneralService,
    private alert: AlertifyService,
    private router: Router
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
      mulQn: new FormControl(false, [Validators.required]),
    });

    console.log(this.genQnForm);

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

  onChange(event: any) {
    if (event.target.checked) {
      sessionStorage.setItem("isMultiple", "true");
    } else {
      sessionStorage.setItem("isMultiple", "false");
    }
  }

  goBack() {
    history.back();
  }

  onSubmit() {
    this.genQnValue = this.genQnForm.value;
    this.genQnValue.answer = this.correctAnswerByCopyPaste;

    if (this.genQnValue.question == "") {
      this.alert.customWarningMsgWithoutBtn("Question is required!");
      return;
    }
    if (this.genQnValue.option1 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 1 is required!");
      return;
    }
    if (this.genQnValue.option2 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 2 is required!");
      return;
    }
    if (this.genQnValue.option3 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 3 is required!");
      return;
    }
    if (this.genQnValue.option4 == "") {
      this.alert.customWarningMsgWithoutBtn("Option 4 is required!");
      return;
    }
    console.log(this.genQnValue.answer);
    if (this.genQnValue.answer == "") {
      this.alert.customWarningMsgWithoutBtn("Answer is required!");
      return;
    }
    if (this.checkDuplicateOptions(this.genQnValue)) {
      console.log(this.genQnValue);

      this.alert.showLoading();
      this.genService
        .addGeneralQuestion(this.genQnValue)
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
              if (!this.genQnForm.value.mulQn) {
                this.router.navigateByUrl("/gen-qn-list");
              } else {
                this.genQnForm.reset();
              }
            }
          });
        });
    }
  }

  checkDuplicateOptions(genQnValue: generalQn): boolean {
    let optionsArr = [
      genQnValue.option1,
      genQnValue.option2,
      genQnValue.option3,
      genQnValue.option4,
    ];

    var resultArr = commonFunctions.FIND_DUPLICATES(optionsArr);
    if (resultArr.length > 0) {
      this.alert.customErrMsgTitle("One of option has duplicate value");
      return false;
    }
    return true;
  }
}

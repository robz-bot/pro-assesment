import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import { HomeService } from "../home/home.service";
import { generalQn } from "./gen-qn";
import { GeneralService } from "./general.service";
import { commonFunctions, message } from "src/app/common";
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

    this.genQnValue.question = this.genQnValue.question.trim()
    this.genQnValue.option1 =this.genQnValue.option1.trim()
    this.genQnValue.option2 =this.genQnValue.option2.trim()
    this.genQnValue.option3 =this.genQnValue.option3.trim()
    this.genQnValue.option4 =this.genQnValue.option4.trim()
    this.genQnValue.answer =this.genQnValue.answer.trim()

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

    //To check answer
    if (!this.checkDuplicateAnswer(this.genQnValue)) {
      this.alert.customWarningMsgWithoutBtn("Incorrect Answer is chosen!");
      return;
    }

    if (this.checkDuplicateOptions(this.genQnValue)) {
      console.log(this.genQnValue);

      this.alert.showLoading();
      this.genService.addGeneralQuestion(this.genQnValue).subscribe(
        (data: any) => {
          Swal.close();
          console.log(data);
          if(data.status==0){
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
        }else if(data.status==1){
          Swal.fire({
            position: "center",
            icon: "error",
            text: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
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

  checkDuplicateAnswer(techQnValue: generalQn): boolean {
    var optionsArr = [
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

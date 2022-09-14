import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { commonFunctions, message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { GeneralService } from "../add-gen-qn/general.service";

@Component({
  selector: "app-update-gen-qn",
  templateUrl: "./update-gen-qn.component.html",
  styleUrls: ["./update-gen-qn.component.css"],
})
export class UpdateGenQnComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private genService: GeneralService,
    private alert: AlertifyService,
    private router: Router
  ) {}

  genQnId: string = "";
  genQn: any;
  teamList: any;
  genQnForm!: FormGroup;
  genQnValue: generalQn = new generalQn();
  correctAnswerByCopyPaste: string = "";
  ngOnInit(): void {
    this.genQnId = this.aroute.snapshot.params["id"];
    this.copyAndPopulate("");

    this.genService.getGeneralQuestionById(this.genQnId).subscribe(
      (data) => {
        this.alert.showLoading();
        console.log(data);
        this.genQn = data;
        //Setting up the value in form Group
        this.genQnForm = new FormGroup({
          question: new FormControl(this.genQn.question, [Validators.required]),
          option1: new FormControl(this.genQn.option1, [Validators.required]),
          option2: new FormControl(this.genQn.option2, [Validators.required]),
          option3: new FormControl(this.genQn.option3, [Validators.required]),
          option4: new FormControl(this.genQn.option4, [Validators.required]),
          answer: new FormControl(this.genQn.answer, [Validators.required]),
          mulQn: new FormControl(false, [Validators.required]),
        });
        Swal.close();
      },
      (err: any) => {
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
    if (choice != "") {
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
    } else {
      this.correctAnswerByCopyPaste = "";
      this.genQnValue.answer = "";
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
      this.genQnValue.answer = this.genQn.answer;
    }
    if (this.checkDuplicateOptions(this.genQnValue)) {
      console.log(this.genQnValue);
      this.genQnValue.id = this.genQnId;

      this.alert.showLoading();
      this.genService
        .updateGeneralQuestion(this.genQnValue)
        .subscribe((data: any) => {
          Swal.close();
          console.log(data);

          //After updated
          Swal.fire({
            title: data.message,
            showDenyButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/gen-qn-list");
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

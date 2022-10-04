import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { message, commonFunctions } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { generalQn } from "../add-gen-qn/gen-qn";
import { TechService } from "../add-tech-qn/tech.service";
import { HomeService } from "../home/home.service";

@Component({
  selector: "app-update-tech-qn",
  templateUrl: "./update-tech-qn.component.html",
  styleUrls: ["./update-tech-qn.component.css"],
})
export class UpdateTechQnComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private techService: TechService,
    private alert: AlertifyService,
    private homeService: HomeService,
    private router: Router
  ) {}

  techQnId: string = "";
  techQn: any;
  teamList: any;
  techQnForm!: FormGroup;
  techQnValue: generalQn = new generalQn();
  correctAnswerByCopyPaste: string = "";
  ngOnInit(): void {
    this.techQnId = this.aroute.snapshot.params["id"];
    this.copyAndPopulate("");

    this.techService.getTechQuestionById(this.techQnId).subscribe(
      (data) => {
        this.getAllTeams();
        console.log(data);
        this.techQn = data;
        //Setting up the value in form Group
        this.techQnForm = new FormGroup({
          question: new FormControl(this.techQn.question, [
            Validators.required,
          ]),
          option1: new FormControl(this.techQn.option1, [Validators.required]),
          option2: new FormControl(this.techQn.option2, [Validators.required]),
          option3: new FormControl(this.techQn.option3, [Validators.required]),
          option4: new FormControl(this.techQn.option4, [Validators.required]),
          answer: new FormControl(this.techQn.answer, [Validators.required]),
          teamId: new FormControl(this.techQn.teamId, [Validators.required]),
          mulQn: new FormControl(false, [Validators.required]),
        });
        //Swal.close();
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
    if (choice != "") {
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
    } else {
      this.correctAnswerByCopyPaste = "";
      this.techQnValue.answer = "";
    }
  }

  goBack() {
    history.back();
  }

  onSubmit() {
    this.techQnValue = this.techQnForm.value;
    this.techQnValue.answer = this.correctAnswerByCopyPaste;

    this.techQnValue.question = this.techQnValue.question.trim()
    this.techQnValue.option1 =this.techQnValue.option1.trim()
    this.techQnValue.option2 =this.techQnValue.option2.trim()
    this.techQnValue.option3 =this.techQnValue.option3.trim()
    this.techQnValue.option4 =this.techQnValue.option4.trim()
    this.techQnValue.answer =this.techQnValue.answer.trim()

    if (this.techQnValue.question.trim() == "") {
      this.alert.customWarningMsgWithoutBtn("Question is required!");
      return;
    }
    if (this.techQnValue.option1.trim() == "") {
      this.alert.customWarningMsgWithoutBtn("Option 1 is required!");
      return;
    }
    if (this.techQnValue.option2.trim() == "") {
      this.alert.customWarningMsgWithoutBtn("Option 2 is required!");
      return;
    }
    if (this.techQnValue.option3.trim() == "") {
      this.alert.customWarningMsgWithoutBtn("Option 3 is required!");
      return;
    }
    if (this.techQnValue.option4.trim() == "") {
      this.alert.customWarningMsgWithoutBtn("Option 4 is required!");
      return;
    }
    if (this.techQnValue.teamId == "") {
      this.alert.customWarningMsgWithoutBtn("Team is required!");
      return;
    }
    console.log(this.techQnValue.answer);

    if (this.techQnValue.answer.trim() == "") {
      this.techQnValue.answer = this.techQn.answer;
    }

    //To check answer
    if (!this.checkDuplicateAnswer(this.techQnValue)) {
      this.alert.customWarningMsgWithoutBtn("Incorrect Answer is chosen!");
      return;
    }

    //To check duplicate Options
    if (this.checkDuplicateOptions(this.techQnValue)) {
      console.log(this.techQnValue);
      this.techQnValue.id = this.techQnId;

      this.alert.showLoading();
      this.techService
        .updateTechQuestion(this.techQnValue)
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
              this.router.navigateByUrl("/tech-qn-list");
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

    const found = optionsArr.find((element) => {
      return element.toLowerCase() === techQnValue.answer.toLowerCase();
    });

    if (found == undefined || found == "") {
      return false;
    }
    return true;
  }

  checkDuplicateOptions(techQnValue: generalQn): boolean {
    let optionsArr = [
      techQnValue.option1,
      techQnValue.option2,
      techQnValue.option3,
      techQnValue.option4,
    ];

    var resultArr = commonFunctions.FIND_DUPLICATES(optionsArr);
    if (resultArr.length > 0) {
      this.alert.customErrMsgTitle("One of option has duplicate value");
      return false;
    }
    return true;
  }
}

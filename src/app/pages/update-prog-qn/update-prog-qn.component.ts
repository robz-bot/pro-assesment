import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { message, commonFunctions } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { ProgramQn } from "../add-prog-qn/prog-qn";
import { ProgService } from "../add-prog-qn/prog.service";
import { HomeService } from "../home/home.service";


@Component({
  selector: 'app-update-prog-qn',
  templateUrl: './update-prog-qn.component.html',
  styleUrls: ['./update-prog-qn.component.css']
})
export class UpdateProgQnComponent implements OnInit {

  constructor(
    private aroute: ActivatedRoute,
    private progService: ProgService,
    private alert: AlertifyService,
    private homeService: HomeService,
    private router: Router
  ) {}

  progQnId: string = "";
  progQn: any;
  teamList: any;
  progQnForm!: FormGroup;
  progQnValue: ProgramQn = new ProgramQn();
  correctAnswerByCopyPaste: string = "";

  ngOnInit(): void {

    this.progQnId = this.aroute.snapshot.params["id"];
    this.progService.getProgramQuestionById(this.progQnId).subscribe(
      (data) => {
        this.getAllTeams();
        console.log(data);
        this.progQn = data;
        //Setting up the value in form Group
        this.progQnForm = new FormGroup({
          question: new FormControl(this.progQn.question, [
            Validators.required,
          ]),
          option1: new FormControl(this.progQn.option1, [Validators.required]),
          option2: new FormControl(this.progQn.option2, [Validators.required]),
          option3: new FormControl(this.progQn.option3, [Validators.required]),
          option4: new FormControl(this.progQn.option4, [Validators.required]),
          answer: new FormControl(this.progQn.answer, [Validators.required]),
          teamId: new FormControl(this.progQn.teamId, [Validators.required]),
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

  goBack() {
    history.back();
  }

  onSubmit() {
    this.progQnValue = this.progQnForm.value;

    this.progQnValue.question = this.progQnValue.question.trim()

    if (this.progQnValue.question == "") {
      this.alert.customWarningMsgWithoutBtn("Question is required!");
      return;
    }

     if (this.progQnValue.questionLevel == "") {
      this.alert.customWarningMsgWithoutBtn("Question Level is required!");
      return;
    }
    if (this.progQnValue.teamId == "") {
      this.alert.customWarningMsgWithoutBtn("Team is required!");
      return;
    }
    console.log(this.progQnValue);
    console.log(this.progQnValue);
    this.alert.showLoading();
    this.progService.addProgramQuestion(this.progQnValue).subscribe(
      (data: any) => {
        Swal.close();
        console.log(data);

        if (data.status == 0) {
          //After added
          Swal.fire({
            title: data.message,
            showDenyButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              if (!this.progQnForm.value.mulQn) {
                this.router.navigateByUrl("/prog-qn-list");
              } else {
                this.progQnForm.reset();
              }
            }
          });
        } else if (data.status == 1) {
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



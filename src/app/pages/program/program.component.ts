import { question } from './../assessment/question';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { browserRefresh } from 'src/app/app.component';
import Swal from "sweetalert2";



@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  htmlContent: any
  questions: any
  programQnList: any = ['Question 1', 'Question 2', 'Question 3'];
  editorConfig: any = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter your program here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    insertImage: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  browserRefresh: any;
  router: any;
  programForm!: FormGroup;
  startTime: any;

  constructor(
    private formBuilder: FormBuilder,

  ) { }
  @ViewChild("completeBtn")
  completeBtn!: ElementRef;
  timeLeft: number = 0;
  interval: any;


  visiblitiyHiddenCount: number = 0;
  @ViewChild("stopBtn") stopBtn!: ElementRef<HTMLElement>;


  ngOnInit(): void {
    sessionStorage.setItem("level", "L2");
    this.browserRefresh = browserRefresh;
    console.log("refreshed?:", browserRefresh);

    if (sessionStorage.getItem("userId") == "null") {
      this.router.navigateByUrl("/");
    }

    sessionStorage.setItem("isReportSaved", "false");
    let visiblitiyHiddenCount = 0;
    //Visiblity change - switching other tabs
    document.addEventListener("visibilitychange", function () {
      let startBtnel: HTMLElement = document.getElementById(
        "startBtn"
      ) as HTMLElement;
      let stopBtnel: HTMLElement = document.getElementById(
        "stopBtn"
      ) as HTMLElement;
      let completeBtnel: HTMLElement = document.getElementById(
        "completeBtn"
      ) as HTMLElement;


      if (document.hidden) {
         // alert("Hidden")
        visiblitiyHiddenCount++;
        if (visiblitiyHiddenCount <= 3) {
          stopBtnel.click();
          //Click fullscreen button through native element
          alert(
            "WARNING: " +
            visiblitiyHiddenCount +
            " You are not suppose to switch / Move from current tab\nAssessment will end after 3 warnings automatically"
          );

          if (visiblitiyHiddenCount > 3) {
            completeBtnel.click();
          }
        }
      } else {
        // alert("shown")
        // if (visiblitiyHiddenCount <= 3) {
        startBtnel.click();
        // }
        if (visiblitiyHiddenCount > 3) {
          completeBtnel.click();
        }
      }
    });
    this.programForm = this.formBuilder.group({});
    const totQns = this.programQnList.length;

    for (let index = 0; index < totQns; index++) {
      const controlName = `qn${index}`;
      this.programForm.addControl(controlName, new FormControl(""));
    }

    console.log(this.programForm)
    //Calculating time for questions
    this.timeLeft = this.programQnList.length * 900;

    // time starting here
    this.startTimer();


  }
  stopTimer() {
    clearInterval(this.interval);
  }
  timerSec: number = 0;
  progressPercentage: number = 0;
  progressColor: string = "";
  startTimer() {
    this.timerSec = 1000;
    this.interval = setInterval(() => {
      this.progressPercentage = Math.trunc((this.timeLeft / 1800) * 100);
      this.timeLeft--;
      this.progressColor = "progress-bar progress-bar-striped ";
      if (this.progressPercentage >= 50) {
        this.progressColor += "bg-success";
      } else if (this.progressPercentage < 20) {
        this.progressColor += "bg-danger";
      } else if (this.progressPercentage > 20 && this.progressPercentage < 50) {
        this.progressColor += "bg-warning";
      }
      console.log("timeLeft: " + this.timeLeft);
      if (this.timeLeft < 1) {
        clearInterval(this.interval);
      }
    }, this.timerSec);
  }

}

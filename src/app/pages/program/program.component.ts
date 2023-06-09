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

  constructor(
    private formBuilder: FormBuilder,

  ) { }
 @ViewChild("completeBtn")
  completeBtn!: ElementRef;

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


    

  }

}

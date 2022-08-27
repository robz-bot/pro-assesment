import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { AssessmentService } from "./assessment.service";
import { questions } from "./questions";

@Component({
  selector: "app-assessment",
  templateUrl: "./assessment.component.html",
  styleUrls: ["./assessment.component.css"],
})
export class AssessmentComponent implements OnInit {
  constructor(private assessmentService: AssessmentService) {}

  questionList: any = [];
  generalQnList: any = [];
  technicalQnList: any = [];

  timeLeft: number = 30;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft == 0) {
        this.onSubmit();
        this.timeLeft = 0;
      }
    }, 1000);
  }
  answerForm!: FormGroup;

  answerArray: Array<String> = [];

  answerValue: questions = new questions();
  ngOnInit(): void {
    this.answerForm = new FormGroup({
      qn1: new FormControl(""),
      qn2: new FormControl(""),
      qn3: new FormControl(""),
      qn4: new FormControl(""),
      qn5: new FormControl(""),
      qn6: new FormControl(""),
      qn7: new FormControl(""),
      qn8: new FormControl(""),
      qn9: new FormControl(""),
      qn10: new FormControl(""),
      qn11: new FormControl(""),
      qn12: new FormControl(""),
      qn13: new FormControl(""),
      qn14: new FormControl(""),
      qn15: new FormControl(""),
      qn16: new FormControl(""),
      qn17: new FormControl(""),
      qn18: new FormControl(""),
      qn19: new FormControl(""),
      qn20: new FormControl(""),
      qn21: new FormControl(""),
      qn22: new FormControl(""),
      qn23: new FormControl(""),
      qn24: new FormControl(""),
      qn25: new FormControl(""),
      qn26: new FormControl(""),
      qn27: new FormControl(""),
      qn28: new FormControl(""),
      qn29: new FormControl(""),
      qn0: new FormControl(""),
    });

    this.startTimer();

    this.questionList = [
      {
        id: 1,
        question:
          "Look at this series: 12, 11, 13, 12, 14, 13, … What number should come next?",
        options: ["10", "16", "13", "15"],
        answer: "15",
      },
      {
        id: 2,
        question: "Which word is the odd man out?",
        options: ["trivial", "unimportant", "important", "insignificant"],
        answer: "important",
      },
      {
        id: 3,
        question:
          "An Informal Gathering occurs when a group of people get together in a casual, relaxed manner. Which situation below is the best example of an Informal Gathering?",
        options: [
          "A debating club meets on the first Sunday morning of every month.",
          "After finding out about his salary raise, Jay and a few colleagues go out for a quick dinner after work.",
          "Meena sends out 10 invitations for a bachelorette party she is giving for her elder sister.",
          "Whenever she eats at a Chinese restaurant, Roop seems to run into Dibya.",
        ],
        answer:
          "After finding out about his salary raise, Jay and a few colleagues go out for a quick dinner after work.",
      },
      {
        id: 4,
        question: "RQP, ONM, _, IHG, FED, find the missing letters.",
        options: ["CDE", "LKI", "LKJ", "BAC"],
        answer: "LKJ",
      },
      {
        id: 5,
        question:
          "Peter is in the East of Tom and Tom is in the North of John. Mike is in the South of John then in which direction of Peter is Mike?",
        options: ["South-East", "South-West", "South", "North-East"],
        answer: "South-West",
      },
      {
        id: 6,
        question: "Which of the below is not a Java Profiler?",
        options: ["JProfiler", "Eclipse Profiler", "JVM", "JConsole"],
        answer: "JVM",
      },
      {
        id: 7,
        question:
          "Which of these packages contains the exception Stack Overflow in Java?",
        options: ["java.io", "java.system", "java.lang", "java.util"],
        answer: "java.lang",
      },
      {
        id: 8,
        question: "Which of the following is true about servlets?",
        options: [
          "Servlets can use the full functionality of the Java class libraries",
          "Servlets execute within the address space of web server, platform independent and uses the functionality of java class libraries",
          "Servlets execute within the address space of web server",
          "Servlets are platform-independent because they are written in java",
        ],
        answer:
          "Servlets execute within the address space of web server, platform independent and uses the functionality of java class libraries",
      },
      {
        id: 9,
        question: "Which one of the following is not an access modifier?",
        options: ["Protected", "Public", "Void", "Private"],
        answer: "A",
      },
      {
        id: 10,
        question:
          "Which of the following is a superclass of every class in Java?",
        options: ["ArrayList", "Abstract class", "Object class", "String"],
        answer: "Object class",
      },
    ];

    this.questionList.forEach((element: any, index: any) => {
      if (index < 5) this.generalQnList.push(element);
    });

    this.questionList.forEach((element: any, index: any) => {
      if (index >= 5 && index < 10) this.technicalQnList.push(element);
    });
  }

  onSubmit() {
    this.questionList.forEach((element: any) => {
      this.answerArray.push(element.answer);
    });
    // console.log(this.answerArray);
    console.log(this.answerForm)
    this.answerValue = this.answerForm.value;
    console.log(this.answerValue)
  }
}

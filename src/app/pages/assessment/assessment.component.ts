import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor() { }
  questionList:any=[]
  ngOnInit(): void {
    this.questionList=[
      {
      "id":1,
      "question":"Which of the below is not a Java Profiler?",
      "options":['JProfiler','Eclipse Profiler','JVM','JConsole'],
      "answer":'JVM'
    },
      {
      "id":2,
      "question":"Which of these packages contains the exception Stack Overflow in Java?",
      "options":['java.io','java.system','java.lang','java.util'],
      "answer":'java.lang'
    },
      {
      "id":3,
      "question":"Which of the following is true about servlets?",
      "options":['Servlets can use the full functionality of the Java class libraries','Servlets execute within the address space of web server, platform independent and uses the functionality of java class libraries','Servlets execute within the address space of web server','Servlets are platform-independent because they are written in java'],
      "answer":'Servlets execute within the address space of web server, platform independent and uses the functionality of java class libraries'
    },
      {
      "id":4,
      "question":"Which one of the following is not an access modifier?",
      "options":['Protected','Public','Void','Private'],
      "answer":'A'
    },
      {
      "id":5,
      "question":"Which of the following is a superclass of every class in Java?",
      "options":['ArrayList','Abstract class','Object class','String'],
      "answer":'Object class'
    }
  ]
  }

}

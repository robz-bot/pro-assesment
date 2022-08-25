import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { team } from './team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  registerForm!: FormGroup;
  //registerValue: register = new register();
  isEmpCodeValid: boolean = true;
  teamList: team[]=[]
  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      empCode: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      manager: new FormControl("", [Validators.required]),
      teamId: new FormControl("", [Validators.required]),
    });

    this.teamList=[
      {
      id:"1",
      teamName:"Java"
    },
      {
      id:"2",
      teamName:"Testing"
    },
      {
      id:"3",
      teamName:"AI/ML"
    },
  ]
  }

  
  

  resData: any;
  submitBtnValue: string = "Start Assessment";
  errMsg: string = "";
  onSubmit() {
    // this.errMsg = "";
    // this.submitBtnValue = "Starting your Survey...";
    // this.registerValue = this.registerForm.value;
    // console.log(this.registerValue);
    // this.registerValue.empCode = this.registerForm.value.empCode;
    // if (!patterns.EMPCODE_PATTERN.test(this.registerValue.empCode)) {
    //   this.isEmpCodeValid = false;
    //   this.submitBtnValue = "Start Survey";
    //   return;
    // }
    // this.registerValue.empCode = this.registerValue.empCode.toUpperCase();
    // this.registerValue.year = DateUtils.CURRENT_YEAR.toString();
    // this.registerValue.month = DateUtils.CURRENT_MONTH.toString();

    // this.homeServiceService.newUser(this.registerValue).subscribe(
    //   (data) => {
    //     this.resData = data;
    //     console.log("After saving in DB(user): ");
    //     console.log(this.resData);
    //     if (this.resData.status == 0) {
    //       this.savedInSession(this.registerValue);
    //       this.route.navigateByUrl("/survey");
    //     } else {
    //       this.errMsg = this.resData.message
    //       this.submitBtnValue = "Start Survey";
    //       this.registerForm.reset()
    //     }
    //   },
    //   (err) => {
    //     console.log("Error :");
    //     console.log(err);
    //     this.errMsg = "Something went wrong. Please contact administrator";
    //     this.submitBtnValue = "Start Survey";
    //   }
    // );
  }

  // savedInSession(form: register) {
  //   sessionStorage.setItem("name", form.name);
  //   sessionStorage.setItem("empcode", form.empCode);
  //   sessionStorage.setItem("company", form.company);
  //   sessionStorage.setItem("manager", form.manager);
  // }

}

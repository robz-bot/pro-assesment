import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report/report.service';

@Component({
  selector: 'app-reviewprogram',
  templateUrl: './reviewprogram.component.html',
  styleUrls: ['./reviewprogram.component.css']
})
export class ReviewprogramComponent implements OnInit {

  constructor(private aroute: ActivatedRoute, private reportService: ReportService, private router: Router) { }
  id: any
  ngOnInit(): void {
    this.id = this.aroute.snapshot.params["id"];
    this.getProgReportsById()
  }
  prog:any
  getProgReportsById() {
    this.reportService.getProgReportsById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.prog = data;
      }
    )
  }

  updateProgReport(){
    // this.reportService.updateProgReports().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.prog = data;
    //   }
    // )
  }

}

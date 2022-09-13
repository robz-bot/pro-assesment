import { Component, OnInit } from '@angular/core';
import { widget } from './dashboard';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
  this.widgetData()
  }

  widgetList:widget[]=[]
  widgetData(){
    this.dashboardService.widgetData().subscribe((data)=>{
      console.log(data);
      this.widgetList = data;
    })
  }

}

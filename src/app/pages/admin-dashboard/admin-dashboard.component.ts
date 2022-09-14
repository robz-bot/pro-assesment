import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/shared-service/alertify.service';
import Swal from 'sweetalert2';
import { widget } from './dashboard';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private alert:AlertifyService) { }

  ngOnInit(): void {
  this.widgetData()
  }

  widgetList:widget[]=[]
  widgetData(){
    this.alert.showLoading()
    this.dashboardService.widgetData().subscribe((data)=>{
      Swal.close()
      console.log(data);
      this.widgetList = data;
    })
  }

}

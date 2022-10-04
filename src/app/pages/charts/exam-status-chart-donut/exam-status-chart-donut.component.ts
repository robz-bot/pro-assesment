import { Component, OnInit } from "@angular/core";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
} from "ng-apexcharts";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { DashboardService } from "../../admin-dashboard/dashboard.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: "app-exam-status-chart-donut",
  templateUrl: "./exam-status-chart-donut.component.html",
  styleUrls: ["./exam-status-chart-donut.component.css"],
})
export class ExamStatusChartDonutComponent implements OnInit {
  chartOptions: any;

  constructor(
    private dashboardService: DashboardService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    const fullDate = date.toISOString().split("T")[0];
    this.searchDate = fullDate;

    this.datewisePassFail();
  }

  searchDate: any;
  passCount: number = 0;
  failCount: number = 0;
  displayDate:boolean = false
  datewisePassFail() {
    this.alert.showLoading();

    this.dashboardService.datewisePassFail(this.searchDate).subscribe(
      (data: any) => {
        console.log(data);
        const { fail, pass } = data;
        this.passCount = pass;
        this.failCount = fail;

        this.settingValues();
        this.displayDate=true
        Swal.close();
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

  settingValues() {
    this.chartOptions = {
      series: [this.failCount, this.passCount],
      chart: {
        foreColor: "#FFFFFF",
        width: 400,
        type: "pie",
      },
      colors: ["#50e817", "#e83417"],
      labels: ["Fail", "Pass"],
      legend: {
        show: false,
        labels: {
          colors: "white",
          useSeriesColors: false,
        },
      },
      theme: {
        mode: "light",
        palette: "palette7",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      title: {
        text: "Date-wise Pass and Fail Counts",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#FFFFFF",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }
}

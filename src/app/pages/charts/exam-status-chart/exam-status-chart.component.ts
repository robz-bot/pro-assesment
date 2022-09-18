import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexChart,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ChartComponent,
} from "ng-apexcharts";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { widget } from "../../admin-dashboard/dashboard";
import { DashboardService } from "../../admin-dashboard/dashboard.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};

@Component({
  selector: "app-exam-status-chart",
  templateUrl: "./exam-status-chart.component.html",
  styleUrls: ["./exam-status-chart.component.css"],
})
export class ExamStatusChartComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: any;

  //widgetList
  //0-today's attempt
  //1-users
  //2-pass
  //3-fail
  //4-teams
  //5-general
  //6-technical
  settingValues() {
    this.chartOptions = {
      series: [
        this.widgetList[6].count,
        this.widgetList[5].count,
        this.widgetList[1].count,
        this.widgetList[4].count,
      ],
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              show: true,
              color:"#FFFFFF"
            },
          },
        },
      },
      colors: ["#E6694C", "#a943bc", "#9dea15", "#48adb7"],
      labels: ["Technical Qns", "General Qns", "User", "Team"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true,
            },
          },
        },
      ],
    };
  }
  constructor(
    private dashboardService: DashboardService,
    private alert: AlertifyService
  ) {}

  widgetList: widget[] = [];
  widgetData() {
    this.alert.showLoading();
    this.dashboardService.widgetData().subscribe(
      (data) => {
        console.log(data);
        this.widgetList = data;
        this.settingValues();
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

  ngOnInit(): void {
    this.widgetData();
  }
}

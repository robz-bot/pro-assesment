import { Component, OnInit, ViewChild } from "@angular/core";
import { message } from "src/app/common";
import { AlertifyService } from "src/app/shared-service/alertify.service";
import Swal from "sweetalert2";
import { DashboardService } from "../../admin-dashboard/dashboard.service";

@Component({
  selector: "app-active-inactive-chart",
  templateUrl: "./active-inactive-chart.component.html",
  styleUrls: ["./active-inactive-chart.component.css"],
})
export class ActiveInactiveChartComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: any;
  constructor(
    private dashboardService: DashboardService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.questionsActiveInactive();
  }

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  params: any = {};

  handlePageChange(event: any) {
    this.page = event;
    this.questionsActiveInactive();
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.questionsActiveInactive();
  }

  techList: any[] = [];
  techListActive: any;
  genListActive: any;
  techListInActive: any;
  genListInActive: any;
  questionsActiveInactive() {
    this.alert.showLoading();
    this.dashboardService.questionsActiveInactive().subscribe(
      (data: any) => {
        console.log(data);
        const {
          techListActive,
          genListActive,
          techListInActive,
          genListInActive,
          techList,
        } = data;
        this.techListActive = techListActive;
        this.genListActive = genListActive;
        this.techListInActive = techListInActive;
        this.genListInActive = genListInActive;
        this.techList = techList;
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

  settingValues() {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Count",
    //       data: [
    //         this.genListActive,
    //         this.genListInActive,
    //         this.techListActive,
    //         this.techListInActive,
    //       ],
    //     },
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //   },
    //   plotOptions: {
    //     bar: {
    //       dataLabels: {
    //         position: "top", // top, center, bottom
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: function (val: any) {
    //       return val;
    //     },
    //     offsetY: -20,
    //     style: {
    //       fontSize: "12px",
    //       colors: ["#304758"],
    //     },
    //   },

    //   xaxis: {
    //     categories: [
    //       "Tech Active",
    //       "Tech In-Active",
    //       "General Active",
    //       "General In-Active",
    //     ],
    //     position: "top",
    //     labels: {
    //       offsetY: -18,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: "gradient",
    //         gradient: {
    //           colorFrom: "#D8E3F0",
    //           colorTo: "#BED1E6",
    //           stops: [0, 100],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5,
    //         },
    //       },
    //     },
    //     tooltip: {
    //       enabled: true,
    //       offsetY: -35,
    //     },
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "light",
    //       type: "horizontal",
    //       shadeIntensity: 0.25,
    //       gradientToColors: undefined,
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [50, 0, 100, 100],
    //     },
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       formatter: function (val: any) {
    //         return val;
    //       },
    //     },
    //   },
    //   title: {
    //     text: "Overall Active & In-Active Questions Count",
    //     floating: 0,
    //     offsetY: 320,
    //     align: "center",
    //     style: {
    //       color: "#444",
    //     },
    //   },
    // };
    this.chartOptions = {
      series: [
        {
          name: "Count",
          data: [
            this.genListActive,
            this.genListInActive,
            this.techListActive,
            this.techListInActive,
          ],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          "General Active",
          "General In-Active",
          "Tech Active",
          "Tech In-Active",
        ],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Title",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
  }
}

import { Component, OnInit } from "@angular/core";
import { prodLinks, projectDesc, qaLinks } from "src/app/common";

@Component({
  selector: "app-all-pro-links",
  templateUrl: "./all-pro-links.component.html",
  styleUrls: ["./all-pro-links.component.css"],
})
export class AllProLinksComponent implements OnInit {
  constructor() {}

  projList = [
    {
      id: 1,
      url: "assets/img/Hireprous.png",
      title: "HireProUs",
      desc: projectDesc.HIREPROUS,
      qa: qaLinks.HIREPROUS_QA,
      prod: prodLinks.HIREPROUS_PROD,
      date: "May 15,2021",
    },
    {
      id: 2,
      url: "assets/img/EPM.png",
      title: "Employee Performance Monitor(EPM)",
      desc: projectDesc.EPM,
      qa: qaLinks.EPM_QA,
      prod: prodLinks.EPM_PROD,
      date: "March 10,2022",
    },
    {
      id: 3,
      url: "assets/img/pro-assess.png",
      title: "Pro Assessment",
      desc: projectDesc.PRO_ASSESS,
      prod: prodLinks.PRO_ASSESS_PROD,
      qa: qaLinks.PRO_ASSESS_QA,
      date: "Aug 2,2022",
    },
  ];

  ngOnInit(): void {}
}

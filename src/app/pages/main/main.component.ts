import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { generalQn } from "../add-gen-qn/gen-qn";
import { GeneralService } from "../add-gen-qn/general.service";
type AOA = any[][];
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent {
  constructor(private generalService:GeneralService) {}
  resultList: generalQn[] = [];
  genDto:generalQn=new generalQn()
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "SheetJS.xlsx";

  saveBulkQn(){
    this.generalService.saveBulkGeneralQuestions(this.resultList).subscribe(data=>{
      console.log(data)
    })
  }

  onFileChange(evt: any) {
    this.data=[]
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("data:", this.data);

      var len = this.data.length;

      for (var i = 0; i < len; i++) {
        this.genDto=new generalQn()
        console.log(this.data[i][0])
          this.genDto.question = this.data[i][0];
          this.genDto.option1 = this.data[i][1];
          this.genDto.option2 = this.data[i][2];
          this.genDto.option3 = this.data[i][3];
          this.genDto.option4 = this.data[i][4];
          this.genDto.answer = this.data[i][5];
        this.resultList.push(this.genDto)
      }

      console.log(this.resultList);

      this.data.map((res) => {
        if (res[0] === "no") {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
}

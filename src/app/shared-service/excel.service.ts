import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    var newJson = json;
    const len = newJson.length;
    // deleting unwanted columns
    for (var i = 0; i < len; i++) {
      Object.keys(newJson).forEach((key: any) => {
        console.log(key);
        newJson[key].reportedOn = newJson[key].reportedOn.split("T")[0];
        if (key == i) {
          delete newJson[key].id;
          delete newJson[key].userId;
          delete newJson[key].teamId;
          delete newJson[key].updatedOn;
          delete newJson[key].message;
          delete newJson[key].updatedBy;
          delete newJson[key].isActive;
          delete newJson[key].teamName;
        }
      });
    }

    // renaming columns
    newJson = newJson.map(function (obj: any) {
      //obj[new key name] = obj[old key name]
      //renameObjKey(obj: any, oldname: any, newname: any)
      renameObjKey(obj, "userName", "Full Name"); // Delete old key
      renameObjKey(obj, "totalNoOfQuestions", "Total No Of Questions"); // Delete old key
      renameObjKey(obj, "noOfQuestionsAnswered", "No Of Questions Answered"); // Delete old key
      renameObjKey(
        obj,
        "noOfQuestionsNotAnswered",
        "No Of Questions Not Answered"
      ); // Delete old key
      renameObjKey(obj, "totalMarks", "Total Marks"); // Delete old key
      renameObjKey(obj, "percentage", "Percentage"); // Delete old key
      renameObjKey(obj, "status", "Status"); // Delete old key
      renameObjKey(obj, "attempts", "Attempts"); // Delete old key
      renameObjKey(obj, "reportedOn", "Reported On"); // Delete old key

      return obj;
    });
    console.log(newJson);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newJson);
    const workbook: XLSX.WorkBook = {
      Sheets: { report: worksheet },
      SheetNames: ["report"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    console.log(excelBuffer);
    this.saveAsExcelFile(excelBuffer, excelFileName, json);
  }
  private saveAsExcelFile(buffer: any, fileName: string, json: any): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );

    // renaming columns
    json = json.map(function (obj: any) {
      //obj[new key name] = obj[old key name]
      //renameObjKey(obj: any, oldname: any, newname: any)
      renameObjKey(obj, "Full Name", "userName"); // Delete old key
      renameObjKey(obj, "Total No Of Questions", "totalNoOfQuestions"); // Delete old key
      renameObjKey(obj, "No Of Questions Answered", "noOfQuestionsAnswered"); // Delete old key
      renameObjKey(
        obj,
        "No Of Questions Not Answered",
        "noOfQuestionsNotAnswered"
      ); // Delete old key
      renameObjKey(obj, "Total Marks", "totalMarks"); // Delete old key
      renameObjKey(obj, "Percentage", "percentage"); // Delete old key
      renameObjKey(obj, "Status", "status"); // Delete old key
      renameObjKey(obj, "Attempts", "attempts"); // Delete old key
      renameObjKey(obj, "Reported On", "reportedOn"); // Delete old key

      return obj;
    });
  }
}
function renameObjKey(obj: any, oldname: any, newname: any) {
  obj[newname] = obj[oldname]; // Assign new key
  delete obj[oldname];
}

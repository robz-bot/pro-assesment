import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { report } from "./report";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}
  //Report URL
  private addReportsUrl = baseUrl.BASE_URL + "addReports";

  addReports(reportDto: report): Observable<Object> {
    return this.httpClient.post(`${this.addReportsUrl}`, reportDto);
  }
}

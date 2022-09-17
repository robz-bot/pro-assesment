import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";

import { report } from "../assessment/report";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllReportsUrl = baseUrl.BASE_URL + "getAllReports";
  private getAllReportsPageUrl = baseUrl.BASE_URL + "getAllReportsPage";
  private searchUrl = baseUrl.BASE_URL + "searchByReport";
  private downloadReportsUrl = baseUrl.BASE_URL + "downloadReports";

  getAllReports() {
    return this.httpClient.get(this.getAllReportsUrl);
  }

  getAllReportsPage(params: any) {
    return this.httpClient.get(this.getAllReportsPageUrl, { params });
  }

  downloadReports(report: report[]): Observable<Object> {
    return this.httpClient.put(
      `${this.downloadReportsUrl}`,
      report,
      {
        
        responseType: 'blob',
      }
    );
  }

  search(type: string, keyword: string): Observable<Object> {
    return this.httpClient.get(`${this.searchUrl}/${type}/${keyword}`);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "src/app/common";
import { widget } from "./dashboard";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private widgetDataUrl = baseUrl.BASE_URL + "widgetData";
  private userAttemptsChartUrl = baseUrl.BASE_URL + "userAttemptsChart";
  private datewisePassFailUrl = baseUrl.BASE_URL + "datewisePassFail";

  widgetData() {
    return this.httpClient.get<widget[]>(this.widgetDataUrl);
  }
  
  datewisePassFail(date: string) {
    return this.httpClient.get<widget[]>(`${this.datewisePassFailUrl}/${date}`);
  }

  userAttemptsChart() {
    return this.httpClient.get<any>(this.userAttemptsChartUrl);
  }
}

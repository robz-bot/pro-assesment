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
  private questionsActiveInactiveUrl = baseUrl.BASE_URL + "questionsActiveInactive";
  private userAttemptsChartUrl = baseUrl.BASE_URL + "userAttemptsChart";
  private datewisePassFailUrl = baseUrl.BASE_URL + "datewisePassFail";
  private teamExamReadinessUrl = baseUrl.BASE_URL + "teamExamReadiness";

  widgetData() {
    return this.httpClient.get<widget[]>(this.widgetDataUrl);
  }
  
  questionsActiveInactive() {
    return this.httpClient.get<widget[]>(this.questionsActiveInactiveUrl);
  }
  
  datewisePassFail(date: string) {
    return this.httpClient.get<widget[]>(`${this.datewisePassFailUrl}/${date}`);
  }

  userAttemptsChart() {
    return this.httpClient.get<any>(this.userAttemptsChartUrl);
  }
  teamExamReadiness() {
    return this.httpClient.get<any>(this.teamExamReadinessUrl);
  }
}

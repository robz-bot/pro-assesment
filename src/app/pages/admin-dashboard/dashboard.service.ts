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

  widgetData() {
    return this.httpClient.get<widget[]>(this.widgetDataUrl);
  }
}

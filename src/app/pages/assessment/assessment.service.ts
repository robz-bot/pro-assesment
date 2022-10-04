import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { timer } from "rxjs";
import { baseUrl } from "src/app/common";
import { team } from "../home/team";
@Injectable({
  providedIn: "root",
})
export class AssessmentService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getExamQnsUrl = baseUrl.BASE_URL + "getExamQns";

  getExamQns(userId: string, teamId: string) {
    return this.httpClient.get<any[]>(
      `${this.getExamQnsUrl}/${teamId}/${userId}`
    );
  }
}

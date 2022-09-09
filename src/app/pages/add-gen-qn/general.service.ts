import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { generalQn } from "./gen-qn";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllGeneralQuestionsUrl =
    baseUrl.BASE_URL + "getAllGeneralQuestions";
  private addGeneralQuestionUrl = baseUrl.BASE_URL + "addGeneralQuestion";

  addGeneralQuestion(genQn: generalQn): Observable<Object> {
    return this.httpClient.post(`${this.addGeneralQuestionUrl}`, genQn);
  }

  getAllGeneralQuestions() {
    return this.httpClient.get(this.getAllGeneralQuestionsUrl);
  }
}

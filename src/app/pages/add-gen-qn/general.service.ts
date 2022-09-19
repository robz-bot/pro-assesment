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
  private getAllGeneralQuestionsPageUrl =
    baseUrl.BASE_URL + "getAllGeneralQuestionsPage";
  private addGeneralQuestionUrl = baseUrl.BASE_URL + "addGeneralQuestion";
  private deleteGeneralQuestionByIdUrl =
    baseUrl.BASE_URL + "deleteGeneralQuestionById";
  private updateGeneralQuestionUrl = baseUrl.BASE_URL + "updateGeneralQuestion";
  private getGeneralQuestionByIdUrl =
    baseUrl.BASE_URL + "getGeneralQuestionById";
  private searchUrl = baseUrl.BASE_URL + "search";
  private searchGenQnPageUrl = baseUrl.BASE_URL + "searchGenQnPage";

  addGeneralQuestion(genQn: generalQn): Observable<Object> {
    return this.httpClient.post(`${this.addGeneralQuestionUrl}`, genQn);
  }

  getGeneralQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.getGeneralQuestionByIdUrl}/${id}`);
  }
  deleteGeneralQuestionById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteGeneralQuestionByIdUrl}/${id}`);
  }

  getAllGeneralQuestions() {
    return this.httpClient.get(this.getAllGeneralQuestionsUrl);
  }

  getAllGeneralQuestionsPage(params: any) {
    return this.httpClient.get(this.getAllGeneralQuestionsPageUrl, { params });
  }

  updateGeneralQuestion(genQn: generalQn) {
    return this.httpClient.put(`${this.updateGeneralQuestionUrl}`, genQn);
  }

  search(type: string, keyword: string): Observable<Object> {
    return this.httpClient.get(`${this.searchUrl}/${type}/${keyword}`);
  }

  searchGenQnPage(
    type: string,
    keyword: string,
    params: any
  ): Observable<Object> {
    return this.httpClient.get(
      `${this.searchGenQnPageUrl}/${type}/${keyword}`,
      { params }
    );
  }
}
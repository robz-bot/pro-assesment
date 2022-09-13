import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { generalQn } from "../add-gen-qn/gen-qn";

@Injectable({
  providedIn: "root",
})
export class TechService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllTechQuestionsUrl = baseUrl.BASE_URL + "getAllTechQuestions";
  private addTechQuestionUrl = baseUrl.BASE_URL + "addTechQuestion";
  private deleteTechQuestionByIdUrl =
    baseUrl.BASE_URL + "deleteTechQuestionById";
  private updateTechQuestionUrl = baseUrl.BASE_URL + "updateTechQuestion";
  private getTechQuestionByIdUrl = baseUrl.BASE_URL + "getTechQuestionById";
  private searchByQnsUrl = baseUrl.BASE_URL + "searchByQns";

  addTechQuestion(genQn: generalQn): Observable<Object> {
    return this.httpClient.post(`${this.addTechQuestionUrl}`, genQn);
  }

  getTechQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.getTechQuestionByIdUrl}/${id}`);
  }
  deleteTechQuestionById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteTechQuestionByIdUrl}/${id}`);
  }

  getAllTechQuestions() {
    return this.httpClient.get(this.getAllTechQuestionsUrl);
  }

  updateTechQuestion(genQn: generalQn) {
    return this.httpClient.put(`${this.updateTechQuestionUrl}`, genQn);
  }

  searchByQns(keyword: string): Observable<Object> {
    return this.httpClient.get(`${this.searchByQnsUrl}/${keyword}`);
  }
}

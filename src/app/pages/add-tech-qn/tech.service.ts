import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { generalQn } from "../add-gen-qn/gen-qn";
import { searchDto } from "../add-gen-qn/searchDto";

@Injectable({
  providedIn: "root",
})
export class TechService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllTechQuestionsUrl = baseUrl.BASE_URL + "getAllTechQuestions";
  private getAllTechQuestionsPageUrl =
    baseUrl.BASE_URL + "getAllTechQuestionsPage";
  private addTechQuestionUrl = baseUrl.BASE_URL + "addTechQuestion";
  private deleteTechQuestionByIdUrl =
    baseUrl.BASE_URL + "deleteTechQuestionById";
  private updateTechQuestionUrl = baseUrl.BASE_URL + "updateTechQuestion";
  private getTechQuestionByIdUrl = baseUrl.BASE_URL + "getTechQuestionById";
  private getInactiveQnsUrl = baseUrl.BASE_URL + "getInactiveQns";
  private searchUrl = baseUrl.BASE_URL + "searchtechQns";
  private searchtechQnsPageUrl = baseUrl.BASE_URL + "searchtechQnsPage";
  private activeQuestionByIdUrl = baseUrl.BASE_URL + "activeQuestionById";
  private inactiveTechQuestionByIdUrl = baseUrl.BASE_URL + "inactiveTechQuestionById";
  private saveBulkTechQuestionsUrl = baseUrl.BASE_URL + "saveBulkTechQuestions";

  addTechQuestion(genQn: generalQn): Observable<Object> {
    return this.httpClient.post(`${this.addTechQuestionUrl}`, genQn);
  }

  saveBulkTechQuestions(genQn: generalQn[]): Observable<Object> {
    return this.httpClient.post(`${this.saveBulkTechQuestionsUrl}`, genQn);
  }

  getTechQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.getTechQuestionByIdUrl}/${id}`);
  }

  deleteTechQuestionById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteTechQuestionByIdUrl}/${id}`);
  }

  inactiveTechQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.inactiveTechQuestionByIdUrl}/${id}`);
  }

  getAllTechQuestions() {
    return this.httpClient.get(this.getAllTechQuestionsUrl);
  }

  getAllTechQuestionsPage(params: any) {
    return this.httpClient.get(this.getAllTechQuestionsPageUrl, { params });
  }

  getInactiveQns(type: string, keyword: string) {
    return this.httpClient.get(`${this.getInactiveQnsUrl}/${type}/${keyword}`);
  }

  activeQuestionById(type: string, id: string) {
    return this.httpClient.get(`${this.activeQuestionByIdUrl}/${type}/${id}`);
  }

  updateTechQuestion(genQn: generalQn) {
    return this.httpClient.put(`${this.updateTechQuestionUrl}`, genQn);
  }

  search(type: string, keyword: string): Observable<Object> {
    return this.httpClient.get(`${this.searchUrl}/${type}/${keyword}`);
  }
  searchDto:searchDto = new searchDto()
  searchtechQnsPage(
    type: string,
    keyword: string,
    params: any
  ): Observable<Object> {
    this.searchDto.keyword=keyword;
    this.searchDto.type=type;
    return this.httpClient.post(`${this.searchtechQnsPageUrl}`, this.searchDto, { params });
    // return this.httpClient.get(
    //   `${this.searchtechQnsPageUrl}/${type}/${keyword}`,
    //   { params }
    // );
  }
}

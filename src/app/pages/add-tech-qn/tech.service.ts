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
  private searchUrl = baseUrl.BASE_URL + "searchtechQns";
  private searchtechQnsPageUrl = baseUrl.BASE_URL + "searchtechQnsPage";

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

  getAllTechQuestionsPage(params: any) {
    return this.httpClient.get(this.getAllTechQuestionsPageUrl, { params });
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

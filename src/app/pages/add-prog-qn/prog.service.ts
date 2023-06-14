import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { searchDto } from "../add-gen-qn/searchDto";
import {ProgramQn } from "../add-prog-qn/prog-qn";

@Injectable({
  providedIn: "root",
})
export class ProgService {
  searchprogramQnsPage: any;
  saveBulkProgramQuestions(resultList: import("../add-gen-qn/gen-qn").generalQn[]) {
    throw new Error("Method not implemented.");
  }
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private addProgramQuestionUrl = baseUrl.BASE_URL + "addProgramQuestion";
  private getAllProgramQuestionsUrl = baseUrl.BASE_URL + "getAllProgramQuestions";
  private getAllProgramQuestionsPageUrl = baseUrl.BASE_URL + "getAllProgramQuestionsPage";
  private getProgramQuestionByIdUrl = baseUrl.BASE_URL + "getProgramQuestionById";
  private updateProgramQuestionUrl = baseUrl.BASE_URL + "updateProgramQuestion";
  private deleteProgramQuestionByIdUrl =baseUrl.BASE_URL + "deleteProgramQuestionById";
  private getInactiveProgramQnsUrl = baseUrl.BASE_URL + "getInactiveProgramQns";
  private searchProgramUrl = baseUrl.BASE_URL + "searchProgramQns";
  private activeProgramQuestionByIdUrl = baseUrl.BASE_URL + "activeProgramQuestionById";
  private inactiveProgramQuestionByIdUrl = baseUrl.BASE_URL + "inactiveProgramQuestionById";
  private searchProgramQnPageUrl = baseUrl.BASE_URL + "searchProgramQnPage";
  private saveBulkProgramQuestionsUrl = baseUrl.BASE_URL + "saveBulkProgramQuestions";

  addProgramQuestion(progQn:ProgramQn): Observable<Object> {
    return this.httpClient.post(`${this.addProgramQuestionUrl}`, progQn);
  }


  getProgramQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.getProgramQuestionByIdUrl}/${id}`);
  }

  deleteProgramQuestionById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteProgramQuestionByIdUrl}/${id}`);
  }

  inactiveProgramQuestionById(id: string): Observable<Object> {
    return this.httpClient.get(`${this.inactiveProgramQuestionByIdUrl}/${id}`);
  }

  getAllProgramQuestions() {
    return this.httpClient.get(this.getAllProgramQuestionsUrl);
  }

  getAllProgramQuestionsPage(params: any) {
    return this.httpClient.get(this.getAllProgramQuestionsPageUrl, { params });
  }

  getInactiveProgramQns(type: string, keyword: string) {
    return this.httpClient.get(`${this.getInactiveProgramQnsUrl}/${type}/${keyword}`);
  }

  activeProgramQuestionById(type: string, id: string) {
    return this.httpClient.get(`${this.activeProgramQuestionByIdUrl}/${type}/${id}`);
  }

  updateProgramQuestion(progQn:ProgramQn) {
    return this.httpClient.put(`${this.updateProgramQuestionUrl}`, progQn);
  }
  
  saveBulkTechQuestions(progQn: ProgramQn[]): Observable<Object> {
    return this.httpClient.post(`${this.saveBulkProgramQuestionsUrl}`, progQn);
  }

  searchProgram(type: string, keyword: string): Observable<Object> {
    return this.httpClient.get(`${this.searchProgramUrl}/${type}/${keyword}`);
  }
  
  searchDto:searchDto = new searchDto()
  searchprogQnsPage(
    type: string,
    keyword: string,
    params: any
  ): Observable<Object> {
    this.searchDto.keyword=keyword;
    this.searchDto.type=type;
    return this.httpClient.post(`${this.searchProgramQnPageUrl}`, this.searchDto, { params });
  }
}

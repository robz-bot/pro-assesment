import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { searchDto } from "../add-gen-qn/searchDto";

import { report } from "../assessment/report";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllUsersPageUrl = baseUrl.BASE_URL + "getAllUsersPage";
  private searchUrl = baseUrl.BASE_URL + "searchUserPage";


  getAllUsersPage(params: any) {
    return this.httpClient.get(this.getAllUsersPageUrl, { params });
  }

  searchDto:searchDto = new searchDto()
  search(type: string, keyword: string,params: any): Observable<Object> {
    this.searchDto.keyword=keyword;
    this.searchDto.type=type;
    return this.httpClient.post(`${this.searchUrl}`, this.searchDto, { params });
  }
}

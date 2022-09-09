import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiKey, baseUrl } from "src/app/common";
import { register } from "./register";
import { team } from "./team";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  //Home URL
  private getAllTeamsUrl = baseUrl.BASE_URL + "getAllTeams";
  private addUserUrl = baseUrl.BASE_URL + "addUser";

  getAllTeams() {
    return this.httpClient.get<team[]>(`${this.getAllTeamsUrl}`);
  }

  addUser(register: register): Observable<Object> {
    return this.httpClient.post(`${this.addUserUrl}`, register);
  }
}

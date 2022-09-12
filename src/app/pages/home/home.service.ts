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
  private addTeamUrl = baseUrl.BASE_URL + "addTeam";
  private deleteTeamByIdUrl = baseUrl.BASE_URL + "deleteTeamById";
  private searchByTeamIdUrl = baseUrl.BASE_URL + "searchByTeamId";

  getAllTeams() {
    return this.httpClient.get<team[]>(`${this.getAllTeamsUrl}`);
  }

  searchByTeamId(id: string) {
    return this.httpClient.get<team[]>(`${this.searchByTeamIdUrl}/${id}`);
  }

  addUser(register: register): Observable<Object> {
    return this.httpClient.post(`${this.addUserUrl}`, register);
  }

  deleteTeamById(id: string) {
    return this.httpClient.delete(`${this.deleteTeamByIdUrl}/${id}`);
  }

  addTeam(team: team): Observable<Object> {
    return this.httpClient.post(`${this.addTeamUrl}`, team);
  }
}

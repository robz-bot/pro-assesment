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
  private getAllTeamsPageUrl = baseUrl.BASE_URL + "getAllTeamsPage";
  private addUserUrl = baseUrl.BASE_URL + "addUser";
  private addTeamUrl = baseUrl.BASE_URL + "addTeam";
  private deleteTeamByIdUrl = baseUrl.BASE_URL + "deleteTeamById";
  private searchByTeamIdUrl = baseUrl.BASE_URL + "searchByTeamId";
  private validatePhnNumberUrl = baseUrl.BASE_URL + "validatePhnNumber";

  getAllTeams() {
    return this.httpClient.get<team[]>(`${this.getAllTeamsUrl}`);
  }

  getAllTeamsPage(params: any) {
    return this.httpClient.get(`${this.getAllTeamsPageUrl}`, { params });
  }

  searchByTeamId(id: string) {
    return this.httpClient.get<team[]>(`${this.searchByTeamIdUrl}/${id}`);
  }

  addUser(register: register,params:any): Observable<Object> {
    var isFromAreadyAppread = params
    return this.httpClient.post(`${this.addUserUrl}/${isFromAreadyAppread}`, register);
  }

  validatePhnNumber(number:string){
    return this.httpClient.get(`${this.validatePhnNumberUrl}/${number}`);
  }

  deleteTeamById(id: string) {
    return this.httpClient.delete(`${this.deleteTeamByIdUrl}/${id}`);
  }

  addTeam(team: team): Observable<Object> {
    return this.httpClient.post(`${this.addTeamUrl}`, team);
  }

  getDialingCodes() {
    return this.httpClient.get(
      "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
    );
  }
}

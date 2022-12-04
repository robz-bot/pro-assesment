import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { adminReq } from "./admin";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  //Admin URL
  private addAdminRequestUrl = baseUrl.BASE_URL + "addAdminRequest";
  private getAllAdminRequestUrl = baseUrl.BASE_URL + "getAllAdminRequest";
  private adminApproveOrDeclineUrl = baseUrl.BASE_URL + "adminApproveOrDecline";
  private getAdminReqDetUrl = baseUrl.BASE_URL + "getAdminReqDet";

  addAdminRequest(adminReq: adminReq): Observable<Object> {
    return this.httpClient.post(`${this.addAdminRequestUrl}`, adminReq);
  }

  getAdminReqDet(adminReq: adminReq): Observable<Object> {
    return this.httpClient.post(`${this.getAdminReqDetUrl}`, adminReq);
  }

  adminApproveOrDecline(adminReq: adminReq,req:string): Observable<Object> {
    return this.httpClient.post(`${this.adminApproveOrDeclineUrl}/${req}`, adminReq);
  }

  getAllAdminRequest(): Observable<Object> {
    return this.httpClient.get(`${this.getAllAdminRequestUrl}`);
  }
}

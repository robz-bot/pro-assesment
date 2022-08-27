import { Injectable } from "@angular/core";
import { timer } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AssessmentService {
  constructor() {}
  getCounter(tick: number) {
    return timer(0, tick);
  }
}

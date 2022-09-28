import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddGenQnComponent } from "./pages/add-gen-qn/add-gen-qn.component";
import { AddTechQnComponent } from "./pages/add-tech-qn/add-tech-qn.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AdminLoginComponent } from "./pages/admin-login/admin-login.component";
import { AdminRequestComponent } from "./pages/admin-request/admin-request.component";
import { AssessmentComponent } from "./pages/assessment/assessment.component";
import { GenQnListComponent } from "./pages/gen-qn-list/gen-qn-list.component";
import { HomeComponent } from "./pages/home/home.component";
import { InactiveQnComponent } from "./pages/inactive-qn/inactive-qn.component";
import { MainComponent } from "./pages/main/main.component";
import { ReportComponent } from "./pages/report/report.component";
import { TeamListComponent } from "./pages/team-list/team-list.component";
import { TechQnListComponent } from "./pages/tech-qn-list/tech-qn-list.component";
import { UpdateGenQnComponent } from "./pages/update-gen-qn/update-gen-qn.component";
import { UpdateTechQnComponent } from "./pages/update-tech-qn/update-tech-qn.component";
import { UsersListComponent } from "./pages/users-list/users-list.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "assessment", component: AssessmentComponent },
  { path: "admin-login", component: AdminLoginComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "add-gen-qn", component: AddGenQnComponent },
  { path: "add-tech-qn", component: AddTechQnComponent },
  { path: "edit-gen-qn/:id", component: UpdateGenQnComponent },
  { path: "edit-tech-qn/:id", component: UpdateTechQnComponent },
  { path: "edit-tech-qn", component: UpdateTechQnComponent },
  { path: "gen-qn-list", component: GenQnListComponent },
  { path: "tech-qn-list", component: TechQnListComponent },
  { path: "team-list", component: TeamListComponent },
  { path: "user-list", component: UsersListComponent },
  { path: "report", component: ReportComponent },
  { path: "inactive-qn", component: InactiveQnComponent },
  { path: "admin-request", component: AdminRequestComponent },
  { path: "main", component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

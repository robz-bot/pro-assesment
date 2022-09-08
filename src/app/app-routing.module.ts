import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddGenQnComponent } from "./pages/add-gen-qn/add-gen-qn.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AdminLoginComponent } from "./pages/admin-login/admin-login.component";
import { AssessmentComponent } from "./pages/assessment/assessment.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "assessment", component: AssessmentComponent },
  { path: "admin-login", component: AdminLoginComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "add-gen-qn", component: AddGenQnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

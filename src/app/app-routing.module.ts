import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssessmentComponent } from "./pages/assessment/assessment.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
   { path: "", component: HomeComponent },
   { path: "assessment", component: AssessmentComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

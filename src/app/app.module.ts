import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { AssessmentComponent } from "./pages/assessment/assessment.component";
import { FormatTimePipe } from "./pipes/format-time.pipe";
import { UserDetailsComponent } from "./shared-components/user-details/user-details.component";
import { AdminLoginComponent } from "./pages/admin-login/admin-login.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AddGenQnComponent } from "./pages/add-gen-qn/add-gen-qn.component";
import { AddTechQnComponent } from "./pages/add-tech-qn/add-tech-qn.component";
import { AdminHeaderComponent } from "./pages/admin-header/admin-header.component";
import { GenQnListComponent } from "./pages/gen-qn-list/gen-qn-list.component";
import { TechQnListComponent } from "./pages/tech-qn-list/tech-qn-list.component";
import { UpdateGenQnComponent } from "./pages/update-gen-qn/update-gen-qn.component";
import { UpdateTechQnComponent } from "./pages/update-tech-qn/update-tech-qn.component";
import { MainComponent } from "./pages/main/main.component";
import { TeamListComponent } from "./pages/team-list/team-list.component";
import { ReportComponent } from './pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssessmentComponent,
    FormatTimePipe,
    UserDetailsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AddGenQnComponent,
    AddTechQnComponent,
    AdminHeaderComponent,
    GenQnListComponent,
    TechQnListComponent,
    UpdateGenQnComponent,
    UpdateTechQnComponent,
    MainComponent,
    TeamListComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

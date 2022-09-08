import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { UserDetailsComponent } from './shared-components/user-details/user-details.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddGenQnComponent } from './pages/add-gen-qn/add-gen-qn.component';
import { AddTechQnComponent } from './pages/add-tech-qn/add-tech-qn.component';
import { AdminHeaderComponent } from './pages/admin-header/admin-header.component';

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
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

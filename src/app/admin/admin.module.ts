import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { UpdateJobPostingComponent } from './update-job-posting/update-job-posting.component';
import { JobLeadsAdminComponent } from './job-leads-admin/job-leads-admin.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    JobsManagementComponent,
    ViewJobPostingsComponent,
    UpdateJobPostingComponent,
    JobLeadsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ]
})
export class AdminModule { }

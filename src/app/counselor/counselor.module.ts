import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounselorHomeComponent } from './counselor-home/counselor-home.component';
import { CounselorRoutingModule } from '../counselor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisteredInZoomComponent } from './registered-in-zoom/registered-in-zoom.component';
import { StudentJobsComponent } from './student-jobs/student-jobs.component';
import { StudentsComplaintsComponent } from './students-complaints/students-complaints.component';
import { AddCompanyEnquiriesComponent } from './add-company-enquiries/add-company-enquiries.component';
import { AddEnquiryComponent } from './add-enquiry/add-enquiry.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { ContactUsEnquiryComponent } from './contact-us-enquiry/contact-us-enquiry.component';
import { AddStudentJobsComponent } from './add-student-jobs/add-student-jobs.component';
import { EditStudentJobsComponent } from './edit-student-jobs/edit-student-jobs.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewEnrollmentsComponent } from './view-enrollments/view-enrollments.component';
import { EventsRegistrationsDataComponent } from './events-registrations-data/events-registrations-data.component';
import { JobleadsComponent } from './jobleads/jobleads.component';



@NgModule({
  declarations: [
    CounselorHomeComponent,
    RegisteredInZoomComponent,
    StudentJobsComponent,
    StudentsComplaintsComponent,
    AddCompanyEnquiriesComponent,
    AddEnquiryComponent,
    JobApplicationComponent,
    ContactUsEnquiryComponent,
    AddStudentJobsComponent,
    EditStudentJobsComponent,
    ViewStudentsComponent,
    ViewEnrollmentsComponent,
    EventsRegistrationsDataComponent,
    JobleadsComponent,
    
  ],
  imports: [
    CommonModule,
    CounselorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ]
})
export class CounselorModule { }

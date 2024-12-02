import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounselorHomeComponent } from './counselor/counselor-home/counselor-home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DailyLeadComponent } from './counselor/daily-lead/daily-lead.component';
import { ViewEnrollmentComponent } from './counselor/view-enrollment/view-enrollment.component';
import { RegisteredInZoomComponent } from './counselor/registered-in-zoom/registered-in-zoom.component';
import { AddCompanyEnquiriesComponent } from './counselor/add-company-enquiries/add-company-enquiries.component';
import { StudentJobsComponent } from './counselor/student-jobs/student-jobs.component';
import { AddTrainerEnquiriesComponent } from './counselor/add-trainer-enquiries/add-trainer-enquiries.component';
import { StudentsComplaintsComponent } from './counselor/students-complaints/students-complaints.component';
import { ViewEnquiryComponent } from './counselor/view-enquiry/view-enquiry.component';
import { AddEnquiryComponent } from './counselor/add-enquiry/add-enquiry.component';
import { JobApplicationComponent } from './counselor/job-application/job-application.component';
import { ContactUsEnquiryComponent } from './counselor/contact-us-enquiry/contact-us-enquiry.component';
import { AddStudentJobsComponent } from './counselor/add-student-jobs/add-student-jobs.component';
import { EditStudentJobsComponent } from './counselor/edit-student-jobs/edit-student-jobs.component';
import { ViewStudentEnrollmentComponent } from './super-admin/view-student-enrollment/view-student-enrollment.component';
import { ViewPaymentsComponent } from './super-admin/view-payments/view-payments.component';
import { ViewStudentsComponent } from './counselor/view-students/view-students.component';
import { ViewEnrollmentsComponent } from './counselor/view-enrollments/view-enrollments.component';
import { EventsRegistrationsDataComponent } from './counselor/events-registrations-data/events-registrations-data.component';
import { JobleadsComponent } from './counselor/jobleads/jobleads.component';



const routes: Routes = [
  { path: '', component: CounselorHomeComponent },
  { path: 'home', component: CounselorHomeComponent },
  { path:'access-denied', component:AccessDeniedComponent},
  { path:'daily-lead', component:DailyLeadComponent},
  { path:'view-enrollment', component:ViewEnrollmentComponent},
  { path:'registered-in-zoom', component:RegisteredInZoomComponent},
  { path:'add-company-enquiries', component:AddCompanyEnquiriesComponent},
  { path:'student-jobs', component:StudentJobsComponent},
  { path:'add-student-jobs', component:AddStudentJobsComponent},
  { path:'add-trainer-enquiries', component:AddTrainerEnquiriesComponent},
  { path:'students-complaints', component:StudentsComplaintsComponent},
  { path:'view-enquiry', component:ViewEnquiryComponent},
  { path:'add-enquiry', component:AddEnquiryComponent},
  { path:'job-application', component:JobApplicationComponent},
  { path:'contact-us-enquiry', component:ContactUsEnquiryComponent},
  { path:'edit-student-jobs', component:EditStudentJobsComponent},
  { path: 'view-students', component:ViewStudentsComponent },
  { path: 'view-enrollments', component:ViewEnrollmentsComponent },
  { path: 'events-registrations', component:EventsRegistrationsDataComponent },
  { path: 'job-leads', component:JobleadsComponent },

  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Change forRoot to forChild
  exports: [RouterModule]
})
export class CounselorRoutingModule { }

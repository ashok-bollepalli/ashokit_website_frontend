import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ClassNoteComponent } from './student/class-note/class-note.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';
import { StudentInterviewQuestionsComponent } from './student/student-interview-questions/student-interview-questions.component';
import { CustomerSupportComponent } from './student/customer-support/customer-support.component';
import { PreviouComplaintsComponent } from './student/previou-complaints/previou-complaints.component';
import { OnlineTrainingsComponent } from './student/TrainingSchedules/online-trainings/online-trainings.component';
import { ClassRoomTrainingsComponent } from './student/TrainingSchedules/class-room-trainings/class-room-trainings.component';
import { WeekendWorkshopComponent } from './student/TrainingSchedules/weekend-workshop/weekend-workshop.component';
import { FreeTrainingsComponent } from './student/TrainingSchedules/free-trainings/free-trainings.component';
import { EditStudentJobsComponent } from './counselor/edit-student-jobs/edit-student-jobs.component';
import { StudentInterviewAnswersComponent } from './student/student-interview-answers/student-interview-answers.component';
import { RaiseComplaintComponent } from './student/raise-complaint/raise-complaint.component';
import { CourseDetailsComponent } from './student/course-details/course-details.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { PersonalDetailsComponent } from './student/personal-details/personal-details.component';
import { ChangePasswordComponent } from './student/change-password/change-password.component';
import { EducationalDetailsComponent } from './student/educational-details/educational-details.component';
import { ClassInformationComponent } from './student/class-information/class-information.component';
import { CompanyDetailsComponent } from './student/company-details/company-details.component';
import { RegisteredEventsComponent } from './student/registered-events/registered-events.component';
import { EnrollmentSuccessComponent } from './student/enrollment-success/enrollment-success.component';



const routes: Routes = [
  { path: '', component: StudentHomeComponent },
  { path: 'home', component: StudentHomeComponent },
  { path:'class-note', component:ClassNoteComponent},
  { path:'access-denied', component:AccessDeniedComponent},
  { path:'my-courses', component:MyCoursesComponent},
  { path:'student-interview-questions', component:StudentInterviewQuestionsComponent},
  { path:'custommer-support', component:CustomerSupportComponent},
  { path:'previou-complaints', component:PreviouComplaintsComponent},
  { path:'edit-student-jobs', component:EditStudentJobsComponent},
  { path:'online-trainings', component: OnlineTrainingsComponent},
  { path:'class-room-trainings', component: ClassRoomTrainingsComponent},
  { path:'weekend-workshop', component: WeekendWorkshopComponent},
  { path:'free-trainings', component: FreeTrainingsComponent},
  { path:'student-interview-answers', component: StudentInterviewAnswersComponent},
  { path:'raise-complaint', component: RaiseComplaintComponent},
  { path:'course-details/:batchId', component: CourseDetailsComponent},
  { path:'course-details', component: CourseDetailsComponent},
  { path:'student-profile', component: StudentProfileComponent},
  { path:'personal-details', component: PersonalDetailsComponent},
  { path:'change-password', component: ChangePasswordComponent},
  { path:'educational-details', component: EducationalDetailsComponent},
  { path:'class-information/:batchCode', component: ClassInformationComponent},
  { path:'placement-details', component: CompanyDetailsComponent},
  { path:'registered-events', component: RegisteredEventsComponent},
  { path:'enrollment-success', component: EnrollmentSuccessComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 

];


@NgModule({
  imports: [RouterModule.forChild(routes)], // Change forRoot to forChild
  exports: [RouterModule]
})
export class StudentRoutingModule { }

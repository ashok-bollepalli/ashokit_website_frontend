import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentRoutingModule } from '../student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClassNoteComponent } from './class-note/class-note.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { StudentInterviewQuestionsComponent } from './student-interview-questions/student-interview-questions.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PreviouComplaintsComponent } from './previou-complaints/previou-complaints.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { OnlineTrainingsComponent } from './TrainingSchedules/online-trainings/online-trainings.component';
import { ClassRoomTrainingsComponent } from './TrainingSchedules/class-room-trainings/class-room-trainings.component';
import { WeekendWorkshopComponent } from './TrainingSchedules/weekend-workshop/weekend-workshop.component';
import { FreeTrainingsComponent } from './TrainingSchedules/free-trainings/free-trainings.component';
import { StudentInterviewAnswersComponent } from './student-interview-answers/student-interview-answers.component';
import { RaiseComplaintComponent } from './raise-complaint/raise-complaint.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EducationalDetailsComponent } from './educational-details/educational-details.component';
import { ClassInformationComponent } from './class-information/class-information.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RegisteredEventsComponent } from './registered-events/registered-events.component';
import { EnrollmentSuccessComponent } from './enrollment-success/enrollment-success.component';





@NgModule({
  declarations: [
    StudentHomeComponent,
    ClassNoteComponent,
    MyCoursesComponent,
    StudentInterviewQuestionsComponent,
    CustomerSupportComponent,
    PreviouComplaintsComponent,
    CourseDetailsComponent,
    OnlineTrainingsComponent,
    ClassRoomTrainingsComponent,
    WeekendWorkshopComponent,
    FreeTrainingsComponent,
    StudentInterviewAnswersComponent,
    RaiseComplaintComponent,
    StudentProfileComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent,
    EducationalDetailsComponent,
    ClassInformationComponent,
    CompanyDetailsComponent,
    RegisteredEventsComponent,
    EnrollmentSuccessComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ]
})
export class StudentModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { CoursesOfferingComponent } from './courses-offering/courses-offering.component';
import { CareersComponent } from './careers/careers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { InternshipsComponent } from './internships/internships.component';
import { StartingHeaderComponent } from './starting-header/starting-header.component';
import { SoftwareDevelopmentComponent } from './software-development/software-development.component';
import { MockInterviewsComponent } from './mock-interviews/mock-interviews.component';
import { WeekendWorkshopsComponent } from './weekend-workshops/weekend-workshops.component';
import { ClassroomTrainingComponent } from './classroom-training/classroom-training.component';
import { OnlineTrainingComponent } from './online-training/online-training.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component'
import { SuperAdminHomeComponent } from './super-admin/super-admin-home/super-admin-home.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { CounselorHomeComponent } from './counselor/counselor-home/counselor-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { TrainerHomeComponent } from './trainer/trainer-home/trainer-home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewCoursesComponent } from './super-admin/view-courses/view-courses.component';
import { SubModulesComponent } from './super-admin/sub-modules/sub-modules.component';
import { AddViewModuleComponent } from './super-admin/add-view-module/add-view-module.component';
import { ViewModulesComponent } from './super-admin/view-modules/view-modules.component';
import { EnrollCourseComponent } from './super-admin/enroll-course/enroll-course.component';
import { NewBatchComponent } from './super-admin/new-batch/new-batch.component';
import { SpecialBatchComponent } from './super-admin/special-batch/special-batch.component';
import { ListMockInterviewsComponent } from './super-admin/list-mock-interviews/list-mock-interviews.component';
import { ListMockInterviewsFeeComponent } from './super-admin/list-mock-interviews-fee/list-mock-interviews-fee.component';
import { TrainerComponent } from './super-admin/trainer/trainer.component';
import { ContactUsEnquiriesComponent } from './super-admin/contact-us-enquiries/contact-us-enquiries.component';
import { BannerComponent } from './super-admin/banner/banner.component';
import { ViewStudentEnrollmentComponent } from './super-admin/view-student-enrollment/view-student-enrollment.component';
import { UpdateStudentComponent } from './super-admin/update-student/update-student.component';
import { AddUpdateComponent } from './super-admin/add-update/add-update.component';
import { StudentBulkComponent } from './super-admin/student-bulk/student-bulk.component';
import { UploadZoomReportComponent } from './super-admin/upload-zoom-report/upload-zoom-report.component';
import { AddCoursesComponent } from './super-admin/add-courses/add-courses.component';
import { AddCourseCategoryComponent } from './super-admin/add-course-category/add-course-category.component';
import { CourseCategoryComponent } from './super-admin/course-category/course-category.component';
import { AddSubModuleComponent } from './super-admin/add-sub-module/add-sub-module.component'
import { AddEmpolymentComponent } from './super-admin/add-empolyment/add-empolyment.component';
import { AddMockInterviewsComponent } from './super-admin/add-mock-interviews/add-mock-interviews.component';
import { EditMockInterviewsComponent } from './super-admin/edit-mock-interviews/edit-mock-interviews.component';
import { ToastrModule } from 'ngx-toastr';
import { TrainerPaymentDetailsComponent}from './super-admin/trainer-payment-details/trainer-payment-details.component';
import { AddStudentEnrollmentComponent } from './super-admin/add-student-enrollment/add-student-enrollment.component';
import { AddTrainerComponent } from './super-admin/add-trainer/add-trainer.component';
import { UpdateSubModuleComponent } from './super-admin/update-sub-module/update-sub-module.component';
import { ZoomRegisteredComponent } from './super-admin/zoom-registered/zoom-registered.component';
import { LandingPagesLeadsComponent } from './super-admin/landing-pages-leads/landing-pages-leads.component';
import { JobApplicationsComponent } from './super-admin/job-applications/job-applications.component';
import { StudentComplaintsComponent } from './super-admin/student-complaints/student-complaints.component';
import { ViewPaymentsComponent } from './super-admin/view-payments/view-payments.component';
import { OurCustomersComponent } from './super-admin/our-customers/our-customers.component';
import { DailyLeadsComponent } from './super-admin/daily-leads/daily-leads.component';
import { UpdateModuleComponent } from './super-admin/update-module/update-module.component';
import { AddSocialsettingsComponent } from './super-admin/add-socialsettings/add-socialsettings.component';
import { AddTrainerPaymentComponent } from './super-admin/add-trainer-payment/add-trainer-payment.component';
import { UpdateEmploymentComponent } from './super-admin/update-employment/update-employment.component';
import { CompanyEnquiryComponent } from './super-admin/company-enquiry/company-enquiry.component';
import { TrainerEnquiryComponent } from './super-admin/trainer-enquiry/trainer-enquiry.component';
import { SocialSettingsComponent } from './super-admin/social-settings/social-settings.component';
import { WorkshopEmailComponent } from './super-admin/notifications/workshop-email/workshop-email.component';
import { WorkshopSmsComponent } from './super-admin/notifications/workshop-sms/workshop-sms.component';
import { DemoEmailComponent } from './super-admin/notifications/demo-email/demo-email.component';
import { DemoSmsComponent } from './super-admin/notifications/demo-sms/demo-sms.component';
import { UpdateSocialSettingsComponent } from './super-admin/update-social-settings/update-social-settings.component';
import { CounsellorComponent } from './super-admin/counsellor/counsellor.component';
import { AddCounsellorComponent } from './super-admin/add-counsellor/add-counsellor.component';
import { UpdateTrainersPaymentComponent } from './super-admin/update-trainers-payment/update-trainers-payment.component';
import { TestimonialComponent } from './super-admin/testimonial/testimonial.component';
import { AddTestimonialComponent } from './super-admin/add-testimonial/add-testimonial.component';
import { UpdateTestimonialComponent } from './super-admin/update-testimonial/update-testimonial.component';
import { UpdateCourseComponent } from './super-admin/update-course/update-course.component';
import { CoursePopUpComponent } from './super-admin/course-popup/course-popup.component';
import { AddPopupComponent } from './super-admin/add-popup/add-popup.component';
import { AddBannerComponent } from './super-admin/add-banner/add-banner.component';
import { UpdateBannerComponent } from './super-admin/update-banner/update-banner.component';
import { UpdateScheduleBatchComponent } from './super-admin/update-schedule-batch/update-schedule-batch.component';
import { SmptSettingsComponent } from './super-admin/smpt-settings/smpt-settings.component';
import { GeneralSettingsComponent } from './super-admin/general-settings/general-settings.component';
import { ViewClientComponent } from './super-admin/client/view-client/view-client.component';
import { AddClientComponent } from './super-admin/client/add-client/add-client.component';
import { UpdateClientComponent } from './super-admin/client/update-client/update-client.component';
import { ViewInterviewCategoryComponent } from './super-admin/view-interview-category/view-interview-category.component';
import { AddCategoryComponent } from './super-admin/add-category/add-category.component';
import { BannerPromotionComponent } from './super-admin/banner-promotion/banner-promotion.component';
import { AddBannerpromotionComponent } from './super-admin/add-bannerpromotion/add-bannerpromotion.component';
import { UpdateBannerPromotionsComponent } from './super-admin/update-banner-promotions/update-banner-promotions.component';
import { UpdatePopupComponent } from './super-admin/update-popup/update-popup.component';
import { UpdateCourseCategoryComponent } from './super-admin/update-course-category/update-course-category.component';
import { ViewInterviewQuestionComponent } from './super-admin/view-interview-question/view-interview-question.component';
import { AddInterviewQuestionsComponent } from './super-admin/add-interview-questions/add-interview-questions.component';
import { UpdateInterviewQuestionsComponent } from './super-admin/update-interview-questions/update-interview-questions.component';
import { PaymentsMethodComponent } from './super-admin/payments-method/payments-method.component';
import { EditBannerPromotionComponent } from './super-admin/edit-banner-promotion/edit-banner-promotion.component';
import { SeoSettingsComponent } from './super-admin/seo-settings/seo-settings.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EventComponent } from './super-admin/event/event/event.component';
import { AddEventComponent } from './super-admin/event/add-event/add-event.component';
import { UpdateEventComponent } from './super-admin/event/update-event/update-event.component';
import { UpdateTrainersComponent } from './super-admin/update-trainers/update-trainers.component';
import { DailyLeadComponent } from './counselor/daily-lead/daily-lead.component';
import { RegisteredInZoomComponent } from './counselor/registered-in-zoom/registered-in-zoom.component';
import { StudentsComplaintsComponent } from './counselor/students-complaints/students-complaints.component';
import { ViewEnquiryComponent } from './counselor/view-enquiry/view-enquiry.component';
import { AddEnquiryComponent } from './counselor/add-enquiry/add-enquiry.component';
import { AddCompanyEnquiriesComponent } from './counselor/add-company-enquiries/add-company-enquiries.component';
import { ViewEnrollmentComponent } from './counselor/view-enrollment/view-enrollment.component';
import { JobApplicationComponent } from './counselor/job-application/job-application.component';
import { AddTrainerEnquiriesComponent } from './counselor/add-trainer-enquiries/add-trainer-enquiries.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { ContactUsEnquiryComponent } from './counselor/contact-us-enquiry/contact-us-enquiry.component';
import { TrainerHeaderComponent } from './trainer/trainer-header/trainer-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddStudentJobsComponent } from './counselor/add-student-jobs/add-student-jobs.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { InternshipFormComponent } from './internship-form/internship-form.component';
import { InterviewAnswersComponent } from './interview-answers/interview-answers.component';
import { PreviouComplaintsComponent } from './student/previou-complaints/previou-complaints.component';
import { StudentJobsComponent } from './counselor/student-jobs/student-jobs.component';
import { FreeTrainingComponent } from './free-training/free-training.component';
import { OnlineTrainingsComponent } from './student/TrainingSchedules/online-trainings/online-trainings.component';
import { ClassRoomTrainingsComponent } from './student/TrainingSchedules/class-room-trainings/class-room-trainings.component';
import { WeekendWorkshopComponent } from './student/TrainingSchedules/weekend-workshop/weekend-workshop.component';
import { FreeTrainingsComponent } from './student/TrainingSchedules/free-trainings/free-trainings.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { EditStudentJobsComponent } from './counselor/edit-student-jobs/edit-student-jobs.component';
import { StudentInterviewQuestionsComponent } from './student/student-interview-questions/student-interview-questions.component';
import { StudentInterviewAnswersComponent } from './student/student-interview-answers/student-interview-answers.component';
import { UploadNotesComponent } from './trainer/upload-notes/upload-notes.component';
import { EventsComponent } from './events/events.component';
import { BatchNotificationComponent } from './super-admin/notifications/batch-notification/batch-notification.component';
import { DailyLeadNotificationComponent } from './super-admin/notifications/daily-lead-notification/daily-lead-notification.component';
import { PlacementsComponent } from './placements/placements.component';
import { RaiseComplaintComponent } from './student/raise-complaint/raise-complaint.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { CourseDetailsComponent } from './student/course-details/course-details.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { ViewTransferBatchComponent } from './super-admin/transfer-batch/view-transfer-batch/view-transfer-batch.component';



import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { EditCounsellorComponent } from './super-admin/edit-counsellor/edit-counsellor.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';
import { EditCourseCategoryComponent } from './super-admin/edit-course-category/edit-course-category.component';
import { EventNotificationComponent } from './super-admin/notifications/event-notification/event-notification.component';
import { BulkNotificationComponent } from './super-admin/notifications/bulk-notification/bulk-notification.component';
import { ClassNotesComponent } from './trainer/class-notes/class-notes.component';
import { DashboardComponent } from './trainer/dashboard/dashboard.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { UpdateUploadnotesComponent } from './trainer/update-uploadnotes/update-uploadnotes.component';
import { AddExistingStudentToNewBatchComponent } from './super-admin/add-existing-student-to-new-batch/add-existing-student-to-new-batch.component';
import { PersonalDetailsComponent } from './student/personal-details/personal-details.component';
import { ChangePasswordComponent } from './student/change-password/change-password.component';
import { EducationalDetailsComponent } from './student/educational-details/educational-details.component';
import { ClassInformationComponent } from './student/class-information/class-information.component';
import { CompanyDetailsComponent } from './student/company-details/company-details.component';
import { UpdateStudentPaymentComponent } from './super-admin/update-student-payment/update-student-payment.component';
import { TrainingScheduleComponent } from './training-schedule/training-schedule.component';
import { JobsManagementComponent } from './admin/jobs-management/jobs-management.component';
import { ViewJobPostingsComponent } from './admin/view-job-postings/view-job-postings.component';
import { UpdateJobPostingComponent } from './admin/update-job-posting/update-job-posting.component';
import { RegisteredEventsComponent } from './student/registered-events/registered-events.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EnrollmentSuccessComponent } from './student/enrollment-success/enrollment-success.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { EventRegistrationSuccessComponent } from './event-registration-success/event-registration-success.component';
import { ViewJobDetailsComponent } from './view-job-details/view-job-details.component';
import { PricingPolicyComponent } from './pricing-policy/pricing-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CancellationRefundPolicyComponent } from './cancellation-refund-policy/cancellation-refund-policy.component';
import { ViewStudentsComponent } from './counselor/view-students/view-students.component';
import { ViewEnrollmentsComponent } from './counselor/view-enrollments/view-enrollments.component';
import { EventsRegistrationsDataComponent } from './counselor/events-registrations-data/events-registrations-data.component';
import { JobleadsComponent } from './counselor/jobleads/jobleads.component';
import { JobLeadsAdminComponent } from './admin/job-leads-admin/job-leads-admin.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    CoursesOfferingComponent,
    OnlineTrainingComponent,
    CareersComponent,
    AboutUsComponent,
    ContactUsComponent,
    InternshipsComponent,
    StartingHeaderComponent,
    SoftwareDevelopmentComponent,
    MockInterviewsComponent,
    AddEmpolymentComponent,
    ClassroomTrainingComponent,
    InterviewQuestionsComponent,
    WeekendWorkshopsComponent,
    LoginComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    SuperAdminHomeComponent,
    StudentHomeComponent,
    CounselorHomeComponent,
    AdminHomeComponent,
    TrainerHomeComponent,
    ForgotPasswordComponent,
    ViewCoursesComponent,
    SubModulesComponent,
    AddViewModuleComponent,
    ViewModulesComponent,
    EnrollCourseComponent,
    NewBatchComponent,
    ListMockInterviewsComponent,
    ListMockInterviewsFeeComponent,
    SpecialBatchComponent,
    TrainerComponent,
    ContactUsEnquiriesComponent,
    SpecialBatchComponent,
    BannerComponent,
    CoursePopUpComponent,
    ViewStudentEnrollmentComponent,
    UpdateStudentComponent,
    AddUpdateComponent,
    StudentBulkComponent,
    UploadZoomReportComponent,
    AddCoursesComponent,
    AddCourseCategoryComponent,
    EditMockInterviewsComponent,
    CourseCategoryComponent,
    AddMockInterviewsComponent,
    CourseCategoryComponent,
    AddSubModuleComponent,
    TrainerPaymentDetailsComponent,
    AddStudentEnrollmentComponent,
    AddTrainerComponent,
    UpdateSubModuleComponent,
    UpdateModuleComponent,
    AddTrainerPaymentComponent,
    AddSocialsettingsComponent,
    UpdateEmploymentComponent,
    AddBannerComponent,
    ZoomRegisteredComponent,
    LandingPagesLeadsComponent,
    JobApplicationsComponent,
    StudentComplaintsComponent,
    ViewPaymentsComponent,
    OurCustomersComponent,
    DailyLeadsComponent,
    CompanyEnquiryComponent,
    TrainerEnquiryComponent,
    SocialSettingsComponent,
    WorkshopEmailComponent,
    WorkshopSmsComponent,
    DemoEmailComponent,
    DemoSmsComponent,
    UpdateSocialSettingsComponent,
    CounsellorComponent,
    AddCounsellorComponent,
    UpdateTrainersPaymentComponent,
    TestimonialComponent,
    AddTestimonialComponent,
    UpdateTestimonialComponent,
    UpdateCourseComponent,
    AddPopupComponent,
    UpdateBannerComponent,
    UpdateScheduleBatchComponent,
    AddPopupComponent,
    SmptSettingsComponent,
    GeneralSettingsComponent,
    ViewClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    ViewInterviewCategoryComponent,
    AddCategoryComponent,
    SmptSettingsComponent,
    BannerPromotionComponent,
    AddBannerpromotionComponent,
    UpdateBannerPromotionsComponent,
    UpdatePopupComponent,
    UpdateCourseCategoryComponent,
    ViewInterviewQuestionComponent,
    AddInterviewQuestionsComponent,
    UpdateInterviewQuestionsComponent,
    PaymentsMethodComponent,
    EditBannerPromotionComponent,
    SeoSettingsComponent,
    PaymentsMethodComponent,
    EventComponent,
    AddEventComponent,
    UpdateEventComponent,
    UpdateTrainersComponent,
    DailyLeadComponent,
    RegisteredInZoomComponent,
    StudentsComplaintsComponent,
    PreviouComplaintsComponent,
    ViewEnquiryComponent,
    AddEnquiryComponent,
    AddCompanyEnquiriesComponent,
    ViewEnrollmentComponent,
    JobApplicationComponent,
    AddTrainerEnquiriesComponent,
    StudentHeaderComponent,
    ContactUsEnquiryComponent,
    TrainerHeaderComponent,
    AddStudentJobsComponent,
    ApplicationFormComponent,
    ContactUsComponent,
    RegistrationSuccessComponent,
    EventRegistrationSuccessComponent,
    InternshipFormComponent,
    ViewDetailsComponent,
    InterviewAnswersComponent,
    StudentJobsComponent,
    FreeTrainingComponent,
    InterviewAnswersComponent,
    OnlineTrainingsComponent,
    ClassRoomTrainingsComponent,
    WeekendWorkshopComponent,
    FreeTrainingsComponent,
    EditStudentJobsComponent,
    StudentInterviewQuestionsComponent,
    StudentInterviewAnswersComponent,
    UploadNotesComponent,
    EventsComponent,
    BatchNotificationComponent,
    DailyLeadNotificationComponent,
    PlacementsComponent,
    RaiseComplaintComponent,
    EventRegisterComponent,
    CourseDetailsComponent,
    StudentProfileComponent,
    ViewTransferBatchComponent,
    EditCounsellorComponent,
    MyCoursesComponent,
    EnrollmentSuccessComponent,
    EditCourseCategoryComponent,
    EventNotificationComponent,
    BulkNotificationComponent,
    ClassNotesComponent,
    DashboardComponent,
    CourseRegistrationComponent,
    StudentRegistrationComponent,
    AddExistingStudentToNewBatchComponent,
    ForgotPasswordComponent,
    UpdateUploadnotesComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent,
    EducationalDetailsComponent,
    ClassInformationComponent,
    CompanyDetailsComponent,
    UpdateStudentPaymentComponent,
    TrainingScheduleComponent,
    JobsManagementComponent,
    ViewJobPostingsComponent,
    UpdateJobPostingComponent,
    RegisteredEventsComponent,
    ResetPasswordComponent,
    RegistrationSuccessComponent,
    EventRegistrationSuccessComponent,
    ViewJobDetailsComponent,
    PricingPolicyComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    CancellationRefundPolicyComponent,
    ViewStudentsComponent,
    ViewEnrollmentsComponent,
    EventsRegistrationsDataComponent,
    JobleadsComponent,
    JobLeadsAdminComponent
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    MatIconModule,
    MatDialogModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ToastrModule.forRoot()
    
  ],

  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('728987257075-a6b3ik77c2ep9buji70q7kkhohl31b3f.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
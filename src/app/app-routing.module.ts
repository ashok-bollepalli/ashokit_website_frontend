import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';
import { CoursesOfferingComponent } from './courses-offering/courses-offering.component';
import { CareersComponent } from './careers/careers.component';
import { InternshipsComponent } from './internships/internships.component';
import { PlacementsComponent } from './placements/placements.component';
import { SoftwareDevelopmentComponent } from './software-development/software-development.component';
import { MockInterviewsComponent } from './mock-interviews/mock-interviews.component';
import { WeekendWorkshopsComponent } from './weekend-workshops/weekend-workshops.component';
import { ClassroomTrainingComponent } from './classroom-training/classroom-training.component';
import { OnlineTrainingComponent } from './online-training/online-training.component';
import { FreeTrainingComponent } from './free-training/free-training.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { StudentGuard } from './student.guard';
import { CounselorGuard } from './counselor.guard';
import { TrainerGuard } from './trainer.guard';
import { AdminGuard } from './admin.guard';
import { SuperAdminGuard } from './superadmin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddCoursesComponent } from './super-admin/add-courses/add-courses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewModulesComponent } from './super-admin/view-modules/view-modules.component';
import { AddViewModuleComponent } from './super-admin/add-view-module/add-view-module.component';
import { NewBatchComponent } from './super-admin/new-batch/new-batch.component';
import { EnrollCourseComponent } from './super-admin/enroll-course/enroll-course.component';
import { SpecialBatchComponent } from './super-admin/special-batch/special-batch.component';
import { ViewStudentEnrollmentComponent } from './super-admin/view-student-enrollment/view-student-enrollment.component';
import { AddStudentEnrollmentComponent } from './super-admin/add-student-enrollment/add-student-enrollment.component';
import { UpdateStudentComponent } from './super-admin/update-student/update-student.component';
import { AddUpdateComponent } from './super-admin/add-update/add-update.component';
import { StudentBulkComponent } from './super-admin/student-bulk/student-bulk.component';
import { UploadZoomReportComponent } from './super-admin/upload-zoom-report/upload-zoom-report.component';
import { EditMockInterviewsComponent } from './super-admin/edit-mock-interviews/edit-mock-interviews.component';
import { SmptSettingsComponent } from './super-admin/smpt-settings/smpt-settings.component';
import { GeneralSettingsComponent } from './super-admin/general-settings/general-settings.component';
import { SocialSettingsComponent } from './super-admin/social-settings/social-settings.component';
import { AddTrainerComponent } from './super-admin/add-trainer/add-trainer.component';
import { ZoomRegisteredComponent } from './super-admin/zoom-registered/zoom-registered.component';
import { CompanyEnquiryComponent } from './super-admin/company-enquiry/company-enquiry.component';
import { TrainerEnquiryComponent } from './super-admin/trainer-enquiry/trainer-enquiry.component';
import { UpdateSocialSettingsComponent } from './super-admin/update-social-settings/update-social-settings.component';
import { UpdateTrainersPaymentComponent } from './super-admin/update-trainers-payment/update-trainers-payment.component';
import { UpdateCourseComponent } from './super-admin/update-course/update-course.component';
import { TestimonialComponent } from './super-admin/testimonial/testimonial.component';
import { AddTestimonialComponent } from './super-admin/add-testimonial/add-testimonial.component';
import { UpdateTestimonialComponent } from './super-admin/update-testimonial/update-testimonial.component';
import { AddPopupComponent } from './super-admin/add-popup/add-popup.component';
import { ViewClientComponent } from './super-admin/client/view-client/view-client.component';
import { AddClientComponent } from './super-admin/client/add-client/add-client.component';
import { UpdateClientComponent } from './super-admin/client/update-client/update-client.component';
import { AddBannerComponent } from './super-admin/add-banner/add-banner.component';
import { BannerComponent } from './super-admin/banner/banner.component';
import { UpdateBannerComponent } from './super-admin/update-banner/update-banner.component';
import { UpdateScheduleBatchComponent } from './super-admin/update-schedule-batch/update-schedule-batch.component';
import { ViewInterviewCategoryComponent } from './super-admin/view-interview-category/view-interview-category.component';
import { UpdateBannerPromotionsComponent } from './super-admin/update-banner-promotions/update-banner-promotions.component';
import { EditBannerPromotionComponent } from './super-admin/edit-banner-promotion/edit-banner-promotion.component';
import { UpdatePopupComponent } from './super-admin/update-popup/update-popup.component';
import { RegisteredInZoomComponent } from './counselor/registered-in-zoom/registered-in-zoom.component';
import { AddCompanyEnquiriesComponent } from './counselor/add-company-enquiries/add-company-enquiries.component';
import { AddTrainerEnquiriesComponent } from './counselor/add-trainer-enquiries/add-trainer-enquiries.component';
import { AddStudentJobsComponent } from './counselor/add-student-jobs/add-student-jobs.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { InternshipFormComponent } from './internship-form/internship-form.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { InterviewAnswersComponent } from './interview-answers/interview-answers.component';
import { EditStudentJobsComponent } from './counselor/edit-student-jobs/edit-student-jobs.component';
import { StudentInterviewAnswersComponent } from './student/student-interview-answers/student-interview-answers.component';
import { StudentInterviewQuestionsComponent } from './student/student-interview-questions/student-interview-questions.component';
import { EventComponent } from './super-admin/event/event/event.component';
import { EventsComponent } from './events/events.component';
import { EditCounsellorComponent } from './super-admin/edit-counsellor/edit-counsellor.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { CompanyDetailsComponent } from './student/company-details/company-details.component';
import { TrainingScheduleComponent } from './training-schedule/training-schedule.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { ViewJobDetailsComponent } from './view-job-details/view-job-details.component';
import { PricingPolicyComponent } from './pricing-policy/pricing-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CancellationRefundPolicyComponent } from './cancellation-refund-policy/cancellation-refund-policy.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent },     
  { path: 'login', component:LoginComponent, pathMatch: 'full'},
  { path: 'about-us', component: AboutUsComponent , pathMatch: 'full'},  
  { path: 'contact-us', component: ContactUsComponent, pathMatch: 'full' },
  { path: 'training-schedule', component: TrainingScheduleComponent, pathMatch: 'full' },
  { path: 'online-training', component: OnlineTrainingComponent, pathMatch: 'full' },
  { path: 'services', component: ServicesComponent, pathMatch: 'full' },
  { path: 'courses-offering', component: CoursesOfferingComponent , pathMatch: 'full'},
  { path: 'assets', component: CoursesOfferingComponent , pathMatch: 'full'},
  { path: 'careers', component: CareersComponent, pathMatch: 'full' },
  { path: 'internships', component: InternshipsComponent, pathMatch: 'full'},
  { path:'software-development', component:SoftwareDevelopmentComponent, pathMatch: 'full'},
  { path:'software-job-openings', component:PlacementsComponent, pathMatch: 'full'},
  { path:'mock-interviews',component:MockInterviewsComponent, pathMatch: 'full'},

  { path:'pricing-policy',component:PricingPolicyComponent, pathMatch: 'full'},
  { path:'terms-conditions',component:TermsConditionsComponent, pathMatch: 'full'},
  { path:'privacy-policy',component:PrivacyPolicyComponent, pathMatch: 'full'},
  { path:'refund-policy',component:CancellationRefundPolicyComponent, pathMatch: 'full'},

  { path: 'onlinetraining', component: OnlineTrainingComponent , pathMatch: 'full'},
  { path: 'classroomtraining', component: ClassroomTrainingComponent, pathMatch: 'full' },
  { path: 'weekendworkshops', component: WeekendWorkshopsComponent, pathMatch: 'full' },
  { path: 'freetraining', component: FreeTrainingComponent, pathMatch: 'full' },
  { path: 'interview-questions', component: InterviewQuestionsComponent, pathMatch: 'full' },
  // { path: 'add-courses', component: AddCoursesComponent, pathMatch: 'full' },
  { path: 'student', loadChildren: () => import('./student-routing.module').then(m => m.StudentRoutingModule), canActivate: [StudentGuard] },
  { path: 'counselor', loadChildren: () => import('./counselor-routing.module').then(m => m.CounselorRoutingModule), canActivate: [CounselorGuard] },
  { path: 'trainer', loadChildren: () => import('./trainer-routing.module').then(m => m.TrainerRoutingModule), canActivate: [TrainerGuard] },
  { path: 'admin', loadChildren: () => import('./admin-routing.module').then(m => m.AdminRoutingModule) , canActivate: [AdminGuard]},
  { path: 'super-admin', loadChildren: () => import('./super-admin-routing.module').then(m => m.SuperAdminRoutingModule), canActivate: [SuperAdminGuard] },
  { path:'page-not-found', component:PageNotFoundComponent, pathMatch: 'full'},
  { path: 'access-denied', component:AccessDeniedComponent},
  { path:'access-denied', component:AccessDeniedComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'view-module', component: ViewModulesComponent, pathMatch: 'full' },
  { path: 'add-view-module', component: AddViewModuleComponent, pathMatch: 'full' },
  { path: 'special-batch', component: SpecialBatchComponent, pathMatch: 'full' },
  { path: 'new-batch', component: NewBatchComponent, pathMatch: 'full' },
  { path: 'enroll-course', component: EnrollCourseComponent, pathMatch: 'full' },
  { path: 'view-student', component: ViewStudentEnrollmentComponent, pathMatch: 'full' },
  { path: 'add-student', component: AddStudentEnrollmentComponent, pathMatch: 'full' },
  { path: 'update-student', component: UpdateStudentComponent, pathMatch: 'full' },
  { path: 'add-update', component: AddUpdateComponent, pathMatch: 'full' },
  { path: 'edit-mock-interviews', component: EditMockInterviewsComponent, pathMatch: 'full' },
  { path: 'student-bulk', component:StudentBulkComponent , pathMatch: 'full' },
  { path: 'upload-zoom-report', component:UploadZoomReportComponent , pathMatch: 'full' },
  { path: 'smpt-settings', component:SmptSettingsComponent , pathMatch: 'full' },
  { path: 'general-settings', component:GeneralSettingsComponent , pathMatch: 'full' },
  { path: 'social-settings', component:SocialSettingsComponent , pathMatch: 'full' },
  { path: 'testimonial', component:TestimonialComponent , pathMatch: 'full' },
  { path: 'add-testimonial', component:AddTestimonialComponent , pathMatch: 'full' },
  { path: 'update-testimonial', component:UpdateTestimonialComponent , pathMatch: 'full' },
  { path: 'add-trainer', component:AddTrainerComponent , pathMatch: 'full'},
  { path: 'zoom-register', component:ZoomRegisteredComponent , pathMatch: 'full'},
  { path: 'company-enquiry', component:CompanyEnquiryComponent , pathMatch: 'full'},
  { path: 'trainer-enquiry', component:TrainerEnquiryComponent , pathMatch: 'full'},
  { path: 'update-social-settings', component:UpdateSocialSettingsComponent , pathMatch: 'full'},
  { path: 'update-trainers-payment', component:UpdateTrainersPaymentComponent , pathMatch: 'full'},
  { path: 'add-popup', component:AddPopupComponent , pathMatch: 'full'},
  { path: 'view-client', component:ViewClientComponent, pathMatch:'full'},
  { path: 'add-client', component:AddClientComponent, pathMatch:'full'},
  { path: 'events', component:EventsComponent , pathMatch: 'full'},
  { path: 'event/:eventSlug', component:EventRegisterComponent , pathMatch: 'full'},
  { path: 'update-client', component:UpdateClientComponent, pathMatch:'full'},
  { path: 'update-course', component:UpdateCourseComponent, pathMatch:'full'},
  { path: 'add-banner', component:AddBannerComponent , pathMatch: 'full'},
  { path: 'banner', component:BannerComponent , pathMatch: 'full'},
  { path: 'update-banner', component: UpdateBannerComponent, pathMatch: 'full'},
  { path: 'update-schedule-batch', component:UpdateScheduleBatchComponent, pathMatch:'full'},
  { path: 'update-banner-promotions', component: UpdateBannerPromotionsComponent, pathMatch: 'full'},
  { path: 'edit-banner-promotions', component: EditBannerPromotionComponent, pathMatch: 'full'},
  { path: 'update-popup', component:UpdatePopupComponent , pathMatch: 'full'},
  { path: 'add-company-enquiries', component:AddCompanyEnquiriesComponent , pathMatch: 'full'},
  { path: 'add-student-jobs', component:AddStudentJobsComponent , pathMatch: 'full'},
  { path: 'edit-student-jobs', component:EditStudentJobsComponent , pathMatch: 'full'},
  { path: 'registered-in-zoom', component:RegisteredInZoomComponent , pathMatch: 'full'},
  { path: 'add-trainer-enquiries', component:AddTrainerEnquiriesComponent , pathMatch: 'full'},
  { path: 'application-form', component:ApplicationFormComponent , pathMatch: 'full'},
  { path: 'internship-form', component:InternshipFormComponent , pathMatch: 'full'},
  { path: 'interview-preparation/:slug', component:InterviewAnswersComponent , pathMatch: 'full'},
  { path: 'student-interview-answers/:categoryName', component:StudentInterviewAnswersComponent , pathMatch: 'full'},
  { path: 'student-interview-questions', component:StudentInterviewQuestionsComponent , pathMatch: 'full'},
  { path: 'edit-counsellor', component:EditCounsellorComponent , pathMatch: 'full'},
  { path: 'course-registration', component:CourseRegistrationComponent , pathMatch: 'full'},
  { path: 'student-registration', component:StudentRegistrationComponent , pathMatch: 'full'},
  { path: 'registration-success', component:RegistrationSuccessComponent , pathMatch: 'full'},
  { path: 'company-details', component:CompanyDetailsComponent , pathMatch: 'full'},
  { path: 'reset-password', component:ResetPasswordComponent , pathMatch: 'full'},
  { path: 'software-jobs/:jobSlug', component:ViewJobDetailsComponent , pathMatch: 'full'},
  { path: 'view-interview-category', component:ViewInterviewCategoryComponent , pathMatch: 'full'},
  { path: 'courses/:courseUrl', component:ViewDetailsComponent , pathMatch: 'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', component: PageNotFoundComponent } ,  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

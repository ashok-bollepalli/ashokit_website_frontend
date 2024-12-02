import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminHomeComponent } from './super-admin/super-admin-home/super-admin-home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddCoursesComponent } from './super-admin/add-courses/add-courses.component';
import { ViewCoursesComponent } from './super-admin/view-courses/view-courses.component';
import { ViewModulesComponent } from './super-admin/view-modules/view-modules.component';
import { AddViewModuleComponent } from './super-admin/add-view-module/add-view-module.component';
import { SubModulesComponent } from './super-admin/sub-modules/sub-modules.component';
import { AddSubModuleComponent } from './super-admin/add-sub-module/add-sub-module.component';
import { NewBatchComponent } from './super-admin/new-batch/new-batch.component';
import { SpecialBatchComponent } from './super-admin/special-batch/special-batch.component';
import { EnrollCourseComponent } from './super-admin/enroll-course/enroll-course.component';
import { AddMockInterviewsComponent } from './super-admin/add-mock-interviews/add-mock-interviews.component';
import { ListMockInterviewsComponent } from './super-admin/list-mock-interviews/list-mock-interviews.component';
import { ListMockInterviewsFeeComponent } from './super-admin/list-mock-interviews-fee/list-mock-interviews-fee.component';
import { TrainerComponent } from './super-admin/trainer/trainer.component';
import { AddTrainerComponent } from './super-admin/add-trainer/add-trainer.component';
import { AddTrainerPaymentComponent } from './super-admin/add-trainer-payment/add-trainer-payment.component';
import { TrainerPaymentDetailsComponent } from './super-admin/trainer-payment-details/trainer-payment-details.component';
import { ContactUsEnquiriesComponent } from './super-admin/contact-us-enquiries/contact-us-enquiries.component';
import { DailyLeadsComponent } from './super-admin/daily-leads/daily-leads.component';
import { ZoomRegisteredComponent } from './super-admin/zoom-registered/zoom-registered.component';
import { LandingPagesLeadsComponent } from './super-admin/landing-pages-leads/landing-pages-leads.component';
import { JobApplicationsComponent } from './super-admin/job-applications/job-applications.component';
import { StudentComplaintsComponent } from './super-admin/student-complaints/student-complaints.component';
import { ViewPaymentsComponent } from './super-admin/view-payments/view-payments.component';
import { OurCustomersComponent } from './super-admin/our-customers/our-customers.component';
import { BannerComponent } from './super-admin/banner/banner.component';
import { AddBannerComponent } from './super-admin/add-banner/add-banner.component';
import { AddPopupComponent } from './super-admin/add-popup/add-popup.component';
import { StaffComponent } from './super-admin/staff/staff.component';
import { CourseCategoryComponent } from './super-admin/course-category/course-category.component';
import { AddCourseCategoryComponent } from './super-admin/add-course-category/add-course-category.component';
import { AddStudentEnrollmentComponent } from './super-admin/add-student-enrollment/add-student-enrollment.component';
import { ViewStudentEnrollmentComponent } from './super-admin/view-student-enrollment/view-student-enrollment.component';
import { UpdateStudentComponent } from './super-admin/update-student/update-student.component';
import { AddUpdateComponent } from './super-admin/add-update/add-update.component';
import { StudentBulkComponent } from './super-admin/student-bulk/student-bulk.component';
import { UploadZoomReportComponent } from './super-admin/upload-zoom-report/upload-zoom-report.component';
import { AddEmpolymentComponent } from './super-admin/add-empolyment/add-empolyment.component';
import { EditMockInterviewsComponent } from './super-admin/edit-mock-interviews/edit-mock-interviews.component';
import { BannerPromotionComponent } from './super-admin/banner-promotion/banner-promotion.component';
import { AddBannerpromotionComponent } from './super-admin/add-bannerpromotion/add-bannerpromotion.component';
import { SmptSettingsComponent } from './super-admin/smpt-settings/smpt-settings.component';
import { GeneralSettingsComponent } from './super-admin/general-settings/general-settings.component';
import { SocialSettingsComponent } from './super-admin/social-settings/social-settings.component';
import { AddSocialsettingsComponent } from './super-admin/add-socialsettings/add-socialsettings.component';
import { AddStaffComponent } from './super-admin/add-staff/add-staff.component';
import { PaymentsMethodComponent } from './super-admin/payments-method/payments-method.component';
import { SeoSettingsComponent } from './super-admin/seo-settings/seo-settings.component';
import { UpdateSubModuleComponent } from './super-admin/update-sub-module/update-sub-module.component';
import { UpdateModuleComponent } from './super-admin/update-module/update-module.component';
import { UpdateEmploymentComponent } from './super-admin/update-employment/update-employment.component';
import { CompanyEnquiryComponent } from './super-admin/company-enquiry/company-enquiry.component';
import { TrainerEnquiryComponent } from './super-admin/trainer-enquiry/trainer-enquiry.component';
import { UpdateSocialSettingsComponent } from './super-admin/update-social-settings/update-social-settings.component';
import { WorkshopEmailComponent } from './super-admin/notifications/workshop-email/workshop-email.component';
import { DemoEmailComponent } from './super-admin/notifications/demo-email/demo-email.component';
import { WorkshopSmsComponent } from './super-admin/notifications/workshop-sms/workshop-sms.component';
import { DemoSmsComponent } from './super-admin/notifications/demo-sms/demo-sms.component';
import { CounsellorComponent } from './super-admin/counsellor/counsellor.component';
import { AddCounsellorComponent } from './super-admin/add-counsellor/add-counsellor.component';
import { UpdateTrainersPaymentComponent } from './super-admin/update-trainers-payment/update-trainers-payment.component';
import { UpdateCourseComponent } from './super-admin/update-course/update-course.component';
import { TestimonialComponent } from './super-admin/testimonial/testimonial.component';
import { AddTestimonialComponent } from './super-admin/add-testimonial/add-testimonial.component';
import { UpdateTestimonialComponent } from './super-admin/update-testimonial/update-testimonial.component';
import { CoursePopUpComponent } from './super-admin/course-popup/course-popup.component';
import { ViewClientComponent } from './super-admin/client/view-client/view-client.component';
import { AddClientComponent } from './super-admin/client/add-client/add-client.component';
import { UpdateClientComponent } from './super-admin/client/update-client/update-client.component';
import { UpdateBannerComponent } from './super-admin/update-banner/update-banner.component';
import { ViewInterviewCategoryComponent } from './super-admin/view-interview-category/view-interview-category.component';
import { AddCategoryComponent } from './super-admin/add-category/add-category.component';
import { UpdateScheduleBatchComponent } from './super-admin/update-schedule-batch/update-schedule-batch.component';
import { UpdateBannerPromotionsComponent } from './super-admin/update-banner-promotions/update-banner-promotions.component';
import { EditBannerPromotionComponent } from './super-admin/edit-banner-promotion/edit-banner-promotion.component';
import { UpdateCourseCategoryComponent } from './super-admin/update-course-category/update-course-category.component';
import { ViewInterviewQuestionComponent } from './super-admin/view-interview-question/view-interview-question.component';
import { UpdateInterviewQuestionsComponent } from './super-admin/update-interview-questions/update-interview-questions.component';
import { AddInterviewQuestionsComponent } from './super-admin/add-interview-questions/add-interview-questions.component';
import { UpdatePopupComponent } from './super-admin/update-popup/update-popup.component';
import { EventComponent } from './super-admin/event/event/event.component';
import { AddEventComponent } from './super-admin/event/add-event/add-event.component';
import { UpdateEventComponent } from './super-admin/event/update-event/update-event.component';
import { UpdateTrainersComponent } from './super-admin/update-trainers/update-trainers.component';
import { BatchNotificationComponent } from './super-admin/notifications/batch-notification/batch-notification.component';
import { BulkNotificationComponent } from './super-admin/notifications/bulk-notification/bulk-notification.component';
import { DailyLeadNotificationComponent } from './super-admin/notifications/daily-lead-notification/daily-lead-notification.component';
import { EditCounsellorComponent } from './super-admin/edit-counsellor/edit-counsellor.component';
import { ViewTransferBatchComponent } from './super-admin/transfer-batch/view-transfer-batch/view-transfer-batch.component';
import { EditCourseCategoryComponent } from './super-admin/edit-course-category/edit-course-category.component';
import { EventNotificationComponent } from './super-admin/notifications/event-notification/event-notification.component';
import { AddExistingStudentToNewBatchComponent } from './super-admin/add-existing-student-to-new-batch/add-existing-student-to-new-batch.component';
import { UpdateStudentPaymentComponent } from './super-admin/update-student-payment/update-student-payment.component';





const routes: Routes = [
  { path: '', component: SuperAdminHomeComponent },
  { path: 'home', component: SuperAdminHomeComponent },
  { path:'access-denied', component:AccessDeniedComponent},
  { path: 'add-courses', component: AddCoursesComponent, pathMatch: 'full' },
  { path: 'view-courses', component:ViewCoursesComponent , pathMatch: 'full' },
  { path: 'view-modules', component:ViewModulesComponent , pathMatch: 'full' },
  { path: 'add-view-module', component:AddViewModuleComponent , pathMatch: 'full' },
  { path: 'view-sub-module', component:SubModulesComponent, pathMatch: 'full' },
  { path: 'add-sub-module', component:AddSubModuleComponent, pathMatch: 'full' },
  { path: 'new-batch', component:NewBatchComponent , pathMatch: 'full' },
  { path: 'special-batch', component:SpecialBatchComponent , pathMatch: 'full' },
  { path: 'enroll-course', component:EnrollCourseComponent , pathMatch: 'full' },
  { path: 'add-mock-interviews', component:AddMockInterviewsComponent , pathMatch: 'full' },
  { path: 'list-mock-interviews', component: ListMockInterviewsComponent , pathMatch: 'full' },
  { path: 'list-mock-interviews-fee', component: ListMockInterviewsFeeComponent , pathMatch: 'full' },
  { path: 'add-employment', component: AddEmpolymentComponent, pathMatch: 'full' },
  { path: 'addTrainer', component:AddTrainerComponent, pathMatch: 'full' },
  { path: 'trainer', component:TrainerComponent, pathMatch: 'full' },
  { path: 'add-trainer-payment', component:AddTrainerPaymentComponent , pathMatch: 'full' },
  { path: 'trainer-payment-details', component:TrainerPaymentDetailsComponent , pathMatch: 'full' },
  { path: 'contact-us-enquiries', component:ContactUsEnquiriesComponent , pathMatch: 'full' },
  { path: 'daily-leads', component:DailyLeadsComponent , pathMatch: 'full' },
  { path: 'zoom-registered', component:ZoomRegisteredComponent, pathMatch: 'full' },
  { path: 'landing-pages-lead', component:LandingPagesLeadsComponent , pathMatch: 'full' },
  { path: 'job-applications', component:JobApplicationsComponent , pathMatch: 'full' },
  { path: 'student-complaints', component:StudentComplaintsComponent , pathMatch: 'full' },
  { path: 'view-payment', component:ViewPaymentsComponent , pathMatch: 'full' },
  { path: 'our-customer', component:OurCustomersComponent , pathMatch: 'full' },
  { path: 'banner', component:BannerComponent , pathMatch: 'full' },
  { path: 'course-popup', component:CoursePopUpComponent , pathMatch: 'full' },
  { path: 'add-banner', component:AddBannerComponent , pathMatch: 'full' },
  { path: 'add-popup', component:AddPopupComponent , pathMatch: 'full' },
  { path: 'add-student-enrollment', component:AddStudentEnrollmentComponent , pathMatch: 'full' },
  { path: 'view-student', component:ViewStudentEnrollmentComponent , pathMatch: 'full' },
  { path: 'update-student', component:UpdateStudentComponent , pathMatch: 'full' },
  { path: 'add-update', component:AddUpdateComponent , pathMatch: 'full' },
  { path: 'student-bulk', component:StudentBulkComponent , pathMatch: 'full' },
  { path: 'upload-zoom-report', component:UploadZoomReportComponent , pathMatch: 'full' },
  { path: 'staff', component: StaffComponent, pathMatch: 'full' },
  { path: 'view-course-category', component:CourseCategoryComponent, pathMatch:'full'},
  { path: 'edit-mock-interviews', component:EditMockInterviewsComponent, pathMatch:'full'},
  { path: 'update-employment', component:UpdateEmploymentComponent, pathMatch:'full'},
  { path: 'add-course-category', component:AddCourseCategoryComponent, pathMatch:'full'},
  { path: 'banner-promotion', component:BannerPromotionComponent, pathMatch:'full'},
  { path: 'smpt-settings', component:SmptSettingsComponent, pathMatch:'full'},
  { path: 'general-settings', component:GeneralSettingsComponent, pathMatch:'full'},
  { path: 'social-settings', component:SocialSettingsComponent, pathMatch:'full'},
  { path: 'add-social-settings', component:AddSocialsettingsComponent, pathMatch:'full'},
  { path: 'add-bannerpromotion', component:AddBannerpromotionComponent, pathMatch:'full'},
  { path: 'seo-settings', component:SeoSettingsComponent, pathMatch:'full'},
  { path: 'payments-method', component:PaymentsMethodComponent, pathMatch:'full'},
  { path: 'update-sub-module', component:UpdateSubModuleComponent, pathMatch:'full'},
  { path: 'add-staff', component: AddStaffComponent, pathMatch:'full'},
  { path: 'update-module', component: UpdateModuleComponent, pathMatch:'full'},
  { path: 'company-enquiry', component: CompanyEnquiryComponent, pathMatch:'full'},
  { path: 'trainer-enquiry', component:TrainerEnquiryComponent , pathMatch: 'full'},
  { path: 'update-social-settings', component: UpdateSocialSettingsComponent, pathMatch:'full'},
  { path: 'workshop-email', component: WorkshopEmailComponent, pathMatch:'full'},
  { path: 'demo-email', component: DemoEmailComponent, pathMatch:'full'},
  { path: 'workshop-sms', component: WorkshopSmsComponent, pathMatch:'full'},
  { path: 'demo-sms', component: DemoSmsComponent, pathMatch:'full'},
  { path: 'counsellor', component: CounsellorComponent, pathMatch:'full'},
  { path: 'addCounsellor', component: AddCounsellorComponent, pathMatch:'full'},
  { path: 'update-trainers-payment', component: UpdateTrainersPaymentComponent, pathMatch:'full'}, 
  { path: 'update-course', component:UpdateCourseComponent, pathMatch:'full'},
  { path: 'testimonial', component:TestimonialComponent, pathMatch:'full'},
  { path: 'add-testimonial', component:AddTestimonialComponent, pathMatch:'full'},
  { path: 'update-testimonial', component:UpdateTestimonialComponent, pathMatch:'full'},
  { path: 'course-pop-up', component: CoursePopUpComponent, pathMatch:'full'},
  { path: 'view-client', component: ViewClientComponent, pathMatch:'full'},
  { path: 'add-client', component: AddClientComponent, pathMatch:'full'},
  { path: 'update-client', component: UpdateClientComponent, pathMatch:'full'},
  { path: 'update-course', component:UpdateCourseComponent, pathMatch:'full'},
  { path: 'update-banner', component: UpdateBannerComponent, pathMatch:'full'},
  { path: 'update-schedule-batch', component:UpdateScheduleBatchComponent, pathMatch:'full'},
  { path: 'view-interview-category', component: ViewInterviewCategoryComponent, pathMatch:'full'},
  { path: 'add-category', component:AddCategoryComponent , pathMatch:'full'},
  { path: 'update-popup', component:UpdatePopupComponent , pathMatch:'full'},
  { path: 'add-interview-questions', component:AddInterviewQuestionsComponent , pathMatch:'full'},
  { path: 'update-interview-questions', component:UpdateInterviewQuestionsComponent , pathMatch:'full'},
  { path: 'view-interview-question', component:ViewInterviewQuestionComponent , pathMatch:'full'},
  { path: 'update-course-category', component:UpdateCourseCategoryComponent , pathMatch:'full'},
  {path: 'update-banner-promotions', component:UpdateBannerPromotionsComponent , pathMatch:'full'},
  {path: 'edit-banner-promotions', component:EditBannerPromotionComponent , pathMatch:'full'},
  { path: 'event', component:EventComponent, pathMatch:'full'},
  { path: 'add-event', component:AddEventComponent, pathMatch:'full'},
  { path: 'update-event', component:UpdateEventComponent, pathMatch:'full'},
  { path: 'update-trainers', component:UpdateTrainersComponent, pathMatch:'full'},
  { path: 'batch-notification', component:BatchNotificationComponent, pathMatch:'full'},
  { path: 'bulk-notification', component:BulkNotificationComponent, pathMatch:'full'},
  { path: 'daily-lead-notification', component:DailyLeadNotificationComponent, pathMatch:'full'},
  { path: 'edit-counsellor', component:EditCounsellorComponent, pathMatch:'full'},
  { path: 'view-transfer-batch', component:ViewTransferBatchComponent, pathMatch:'full'},
  { path: 'add-counsellor', component:AddCounsellorComponent, pathMatch:'full'},
  { path: 'edit-course-category', component: EditCourseCategoryComponent, pathMatch:'full'},
  { path: 'event-notification', component: EventNotificationComponent, pathMatch: 'full'},
  { path: 'add-existing-student-to-new-batch/:studentId', component: AddExistingStudentToNewBatchComponent, pathMatch: 'full'},
  { path: 'update-student-payment', component: UpdateStudentPaymentComponent, pathMatch: 'full'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Change forRoot to forChild
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }

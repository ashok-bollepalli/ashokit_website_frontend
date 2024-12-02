import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminRoutingModule } from '../super-admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { ViewModulesComponent } from './view-modules/view-modules.component';
import { AddViewModuleComponent } from './add-view-module/add-view-module.component';
import { SubModulesComponent } from './sub-modules/sub-modules.component';
import { AddSubModuleComponent } from './add-sub-module/add-sub-module.component';
import { NewBatchComponent } from './new-batch/new-batch.component';
import { SpecialBatchComponent } from './special-batch/special-batch.component';
import { EnrollCourseComponent } from './enroll-course/enroll-course.component';
import { AddMockInterviewsComponent } from './add-mock-interviews/add-mock-interviews.component';
import { ListMockInterviewsComponent } from './list-mock-interviews/list-mock-interviews.component';
import { ListMockInterviewsFeeComponent } from './list-mock-interviews-fee/list-mock-interviews-fee.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AddTrainerPaymentComponent } from './add-trainer-payment/add-trainer-payment.component';
import { TrainerPaymentDetailsComponent } from './trainer-payment-details/trainer-payment-details.component';
import { BannerComponent } from './banner/banner.component';
import { CoursePopUpComponent } from './course-popup/course-popup.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { ContactUsEnquiriesComponent } from './contact-us-enquiries/contact-us-enquiries.component';
import { DailyLeadsComponent } from './daily-leads/daily-leads.component';
import { ZoomRegisteredComponent } from './zoom-registered/zoom-registered.component';
import { LandingPagesLeadsComponent } from './landing-pages-leads/landing-pages-leads.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { StudentComplaintsComponent } from './student-complaints/student-complaints.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { OurCustomersComponent } from './our-customers/our-customers.component';
import { ViewStudentEnrollmentComponent } from './view-student-enrollment/view-student-enrollment.component';
import { AddStudentEnrollmentComponent } from './add-student-enrollment/add-student-enrollment.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AddUpdateComponent } from './add-update/add-update.component';
import { StudentBulkComponent } from './student-bulk/student-bulk.component';
import { UploadZoomReportComponent } from './upload-zoom-report/upload-zoom-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff/staff.component';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { AddCourseCategoryComponent } from './add-course-category/add-course-category.component';
import { AddEmpolymentComponent } from './add-empolyment/add-empolyment.component';
import { EditMockInterviewsComponent } from './edit-mock-interviews/edit-mock-interviews.component';
import { BannerPromotionComponent } from './banner-promotion/banner-promotion.component';
import { AddBannerpromotionComponent } from './add-bannerpromotion/add-bannerpromotion.component';
import { SmptSettingsComponent } from './smpt-settings/smpt-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { SocialSettingsComponent } from './social-settings/social-settings.component';
import { AddSocialsettingsComponent } from './add-socialsettings/add-socialsettings.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { SeoSettingsComponent } from './seo-settings/seo-settings.component';
import { PaymentsMethodComponent } from './payments-method/payments-method.component';
import { UpdateSubModuleComponent } from './update-sub-module/update-sub-module.component';
import { UpdateModuleComponent } from './update-module/update-module.component';
import { UpdateEmploymentComponent } from './update-employment/update-employment.component';
import { TrainerEnquiryComponent } from './trainer-enquiry/trainer-enquiry.component';
import { CompanyEnquiryComponent } from './company-enquiry/company-enquiry.component';
import { WorkshopEmailComponent } from './notifications/workshop-email/workshop-email.component';
import { DemoEmailComponent } from './notifications/demo-email/demo-email.component';
import { WorkshopSmsComponent } from './notifications/workshop-sms/workshop-sms.component';
import { DemoSmsComponent } from './notifications/demo-sms/demo-sms.component';
import { UpdateSocialSettingsComponent } from './update-social-settings/update-social-settings.component';
import { CounsellorComponent } from './counsellor/counsellor.component';
import { AddCounsellorComponent } from './add-counsellor/add-counsellor.component';
import { UpdateTrainersPaymentComponent } from './update-trainers-payment/update-trainers-payment.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { ViewClientComponent } from './client/view-client/view-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { UpdateTestimonialComponent } from './update-testimonial/update-testimonial.component';
import { UpdateBannerComponent } from './update-banner/update-banner.component';
import { UpdateScheduleBatchComponent } from './update-schedule-batch/update-schedule-batch.component';
import { ViewInterviewCategoryComponent } from './view-interview-category/view-interview-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCourseCategoryComponent } from './update-course-category/update-course-category.component';
import { UpdateTrainersComponent } from './update-trainers/update-trainers.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BatchNotificationComponent } from './notifications/batch-notification/batch-notification.component';
import { DailyLeadNotificationComponent } from './notifications/daily-lead-notification/daily-lead-notification.component';
import { BulkNotificationComponent } from './notifications/bulk-notification/bulk-notification.component';
import { EditCounsellorComponent } from './edit-counsellor/edit-counsellor.component';
import { ViewTransferBatchComponent } from './transfer-batch/view-transfer-batch/view-transfer-batch.component';
import { EditCourseCategoryComponent } from './edit-course-category/edit-course-category.component';
import { EventNotificationComponent } from './notifications/event-notification/event-notification.component';
import { AddExistingStudentToNewBatchComponent } from './add-existing-student-to-new-batch/add-existing-student-to-new-batch.component';
import { UpdateStudentPaymentComponent } from './update-student-payment/update-student-payment.component';






@NgModule({
  declarations: [
    SuperAdminHomeComponent,
    AddCoursesComponent,
    ViewCoursesComponent,
    ViewModulesComponent,
    AddViewModuleComponent,
    SubModulesComponent,
    AddSubModuleComponent,
    NewBatchComponent,
    SpecialBatchComponent,
    EnrollCourseComponent,
    AddMockInterviewsComponent,
    ListMockInterviewsComponent,
    ListMockInterviewsFeeComponent,
    AddTrainerComponent,
    TrainerComponent,
    AddTrainerPaymentComponent,
    TrainerPaymentDetailsComponent,
    ContactUsEnquiriesComponent,
    DailyLeadsComponent,
    ZoomRegisteredComponent,
    LandingPagesLeadsComponent,
    JobApplicationsComponent,
    StudentComplaintsComponent,
    ViewPaymentsComponent,
    OurCustomersComponent,
    ViewStudentEnrollmentComponent,
    AddStudentEnrollmentComponent,
    UpdateStudentComponent,
    AddUpdateComponent,
    StudentBulkComponent,
    UploadZoomReportComponent,
    StaffComponent,
    CourseCategoryComponent,
    AddCourseCategoryComponent,
    AddEmpolymentComponent,
    EditMockInterviewsComponent,
    BannerComponent,
    CoursePopUpComponent,
    AddBannerComponent,
    AddPopupComponent,
    BannerPromotionComponent,
    AddBannerpromotionComponent,
    SmptSettingsComponent,
    GeneralSettingsComponent,
    SocialSettingsComponent,
    AddSocialsettingsComponent,
    AddStaffComponent,
    SeoSettingsComponent,
    PaymentsMethodComponent,
    UpdateSubModuleComponent,
    UpdateSubModuleComponent,
    UpdateModuleComponent,
    UpdateEmploymentComponent,
    TrainerEnquiryComponent,
    CompanyEnquiryComponent,
    WorkshopEmailComponent,
    DemoEmailComponent,
    WorkshopSmsComponent,
    DemoSmsComponent,
    UpdateSocialSettingsComponent,
    CounsellorComponent,
    AddCounsellorComponent,
    AddTrainerPaymentComponent,
    UpdateTrainersPaymentComponent,
    UpdateCourseComponent,
    UpdateScheduleBatchComponent,
    ViewClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    AddTestimonialComponent,
    UpdateTestimonialComponent,
    UpdateBannerComponent,
    ViewInterviewCategoryComponent,
    AddCategoryComponent,
    UpdateCourseCategoryComponent,
    UpdateTrainersComponent,
    BatchNotificationComponent,
    DailyLeadNotificationComponent,
    BulkNotificationComponent,
    EditCounsellorComponent,
    ViewTransferBatchComponent,
    EditCourseCategoryComponent,
    EventNotificationComponent,
    AddExistingStudentToNewBatchComponent,
    UpdateStudentPaymentComponent

  



  ],
  imports: [
    BrowserModule,
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule 
  ]
})
export class SuperAdminModule { }

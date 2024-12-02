import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddCoursesComponent } from './super-admin/add-courses/add-courses.component';
import { ViewCoursesComponent } from './super-admin/view-courses/view-courses.component';
import { ViewModulesComponent } from './super-admin/view-modules/view-modules.component';
import { AddViewModuleComponent } from './super-admin/add-view-module/add-view-module.component';
import { SubModulesComponent } from './super-admin/sub-modules/sub-modules.component';
import { AddSubModuleComponent } from './super-admin/add-sub-module/add-sub-module.component';
import { EnrollCourseComponent } from './super-admin/enroll-course/enroll-course.component';
import { ZoomRegisteredComponent } from './super-admin/zoom-registered/zoom-registered.component';
import { LandingPagesLeadsComponent } from './super-admin/landing-pages-leads/landing-pages-leads.component';
import { JobApplicationsComponent } from './super-admin/job-applications/job-applications.component';
import { StudentComplaintsComponent } from './super-admin/student-complaints/student-complaints.component';
import { BannerComponent } from './super-admin/banner/banner.component';
import { CoursePopUpComponent } from './super-admin/course-popup/course-popup.component';
import { AddBannerComponent } from './super-admin/add-banner/add-banner.component';
import { AddPopupComponent } from './super-admin/add-popup/add-popup.component';
import { CourseCategoryComponent } from './super-admin/course-category/course-category.component';
import { AddCourseCategoryComponent } from './super-admin/add-course-category/add-course-category.component';
import { BannerPromotionComponent } from './super-admin/banner-promotion/banner-promotion.component';
import { AddBannerpromotionComponent } from './super-admin/add-bannerpromotion/add-bannerpromotion.component';
import { UpdateSubModuleComponent } from './super-admin/update-sub-module/update-sub-module.component';
import { UpdateModuleComponent } from './super-admin/update-module/update-module.component';
import { UpdateCourseComponent } from './super-admin/update-course/update-course.component';
import { TestimonialComponent } from './super-admin/testimonial/testimonial.component';
import { AddTestimonialComponent } from './super-admin/add-testimonial/add-testimonial.component';
import { UpdateTestimonialComponent } from './super-admin/update-testimonial/update-testimonial.component';
import { ViewClientComponent } from './super-admin/client/view-client/view-client.component';
import { AddClientComponent } from './super-admin/client/add-client/add-client.component';
import { UpdateClientComponent } from './super-admin/client/update-client/update-client.component';
import { UpdateBannerComponent } from './super-admin/update-banner/update-banner.component';
import { ViewInterviewCategoryComponent } from './super-admin/view-interview-category/view-interview-category.component';
import { AddCategoryComponent } from './super-admin/add-category/add-category.component';
import { UpdatePopupComponent } from './super-admin/update-popup/update-popup.component';
import { AddInterviewQuestionsComponent } from './super-admin/add-interview-questions/add-interview-questions.component';
import { UpdateInterviewQuestionsComponent } from './super-admin/update-interview-questions/update-interview-questions.component';
import { ViewInterviewQuestionComponent } from './super-admin/view-interview-question/view-interview-question.component';
import { UpdateCourseCategoryComponent } from './super-admin/update-course-category/update-course-category.component';
import { UpdateBannerPromotionsComponent } from './super-admin/update-banner-promotions/update-banner-promotions.component';
import { EditBannerPromotionComponent } from './super-admin/edit-banner-promotion/edit-banner-promotion.component';
import { EditCourseCategoryComponent } from './super-admin/edit-course-category/edit-course-category.component';
import { JobsManagementComponent } from './admin/jobs-management/jobs-management.component';
import { ViewJobPostingsComponent } from './admin/view-job-postings/view-job-postings.component';
import { UpdateJobPostingComponent } from './admin/update-job-posting/update-job-posting.component';
import { UploadZoomReportComponent } from './super-admin/upload-zoom-report/upload-zoom-report.component';
import { EventComponent } from './super-admin/event/event/event.component';
import { AddEventComponent } from './super-admin/event/add-event/add-event.component';
import { UpdateEventComponent } from './super-admin/event/update-event/update-event.component';
import { JobLeadsAdminComponent } from './admin/job-leads-admin/job-leads-admin.component';




const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'home', component: AdminHomeComponent },
  { path:'access-denied', component:AccessDeniedComponent},
  { path: 'add-courses', component: AddCoursesComponent, pathMatch: 'full' },
  { path: 'view-courses', component:ViewCoursesComponent , pathMatch: 'full' },
  { path: 'view-modules', component:ViewModulesComponent , pathMatch: 'full' },
  { path: 'add-view-module', component:AddViewModuleComponent , pathMatch: 'full' },
  { path: 'view-sub-module', component:SubModulesComponent, pathMatch: 'full' },
  { path: 'add-sub-module', component:AddSubModuleComponent, pathMatch: 'full' },
  { path: 'enroll-course', component:EnrollCourseComponent , pathMatch: 'full' },
  { path: 'zoom-registered', component:ZoomRegisteredComponent, pathMatch: 'full' },
  { path: 'upload-zoom-report', component:UploadZoomReportComponent, pathMatch: 'full' },
  { path: 'landing-pages-lead', component:LandingPagesLeadsComponent , pathMatch: 'full' },
  { path: 'job-applications', component:JobApplicationsComponent , pathMatch: 'full' },
  { path: 'student-complaints', component:StudentComplaintsComponent , pathMatch: 'full' },
  { path: 'banner', component:BannerComponent , pathMatch: 'full' },
  { path: 'course-popup', component:CoursePopUpComponent , pathMatch: 'full' },
  { path: 'add-banner', component:AddBannerComponent , pathMatch: 'full' },
  { path: 'add-popup', component:AddPopupComponent , pathMatch: 'full' },
  { path: 'view-course-category', component:CourseCategoryComponent, pathMatch:'full'},
  { path: 'add-course-category', component:AddCourseCategoryComponent, pathMatch:'full'},
  { path: 'banner-promotion', component:BannerPromotionComponent, pathMatch:'full'},
  { path: 'add-bannerpromotion', component:AddBannerpromotionComponent, pathMatch:'full'},
  { path: 'update-sub-module', component:UpdateSubModuleComponent, pathMatch:'full'},
  { path: 'update-module', component: UpdateModuleComponent, pathMatch:'full'}, 
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
  { path: 'view-interview-category', component: ViewInterviewCategoryComponent, pathMatch:'full'},
  { path: 'add-category', component:AddCategoryComponent, pathMatch:'full'},
  { path: 'update-popup', component:UpdatePopupComponent, pathMatch:'full'},
  { path: 'add-interview-questions', component:AddInterviewQuestionsComponent, pathMatch:'full'},
  { path: 'update-interview-questions', component:UpdateInterviewQuestionsComponent, pathMatch:'full'},
  { path: 'view-interview-question', component:ViewInterviewQuestionComponent, pathMatch:'full'},
  { path: 'update-course-category', component:UpdateCourseCategoryComponent, pathMatch:'full'},
  {path: 'update-banner-promotions', component:UpdateBannerPromotionsComponent, pathMatch:'full'},
  {path: 'edit-banner-promotions', component:EditBannerPromotionComponent, pathMatch:'full'},
  { path: 'edit-course-category', component: EditCourseCategoryComponent, pathMatch:'full'},
  { path: 'add-banner-promotion', component: AddBannerpromotionComponent, pathMatch:'full'},
  { path: 'jobs-management', component: JobsManagementComponent, pathMatch:'full'},
  { path: 'view-job-posting', component: ViewJobPostingsComponent, pathMatch:'full'},
  { path: 'update-job-posting', component: UpdateJobPostingComponent, pathMatch:'full'},
  { path: 'event', component:EventComponent, pathMatch:'full'},
  { path: 'add-event', component:AddEventComponent, pathMatch:'full'},
  { path: 'update-event', component:UpdateEventComponent, pathMatch:'full'},
  { path: 'upload-job-leads', component:JobLeadsAdminComponent, pathMatch:'full'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Change forRoot to forChild
  exports: [RouterModule]
})
export class AdminRoutingModule { }

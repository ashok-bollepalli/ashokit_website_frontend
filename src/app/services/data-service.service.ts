import { Injectable } from '@angular/core';
import { SubModuleDTO } from '../dto/SubModuleDTO';
import { ModuleDTO } from '../dto/ModuleDTO';
import { TrainerDTO } from '../dto/TrainerDTO';
import { StudentDTO } from '../dto/StudentDTO';
import { TrainerPaymentDTO } from '../dto/TrainerPaymentDTO';
import { MockInterviewsDTO } from '../dto/mockInterviewsDTO';
import { MockInterviewFeeDTO } from '../dto/MockInterviewFeeDTO';
import { SocialSettingsDTO } from '../dto/SocialSettingsDTO';
import { CounsellorDTO } from '../dto/CounsellorDTO';
import { TestimonialDTO } from '../dto/TestimonialDTO';
import { CourseDTO } from '../dto/CourseDTO';
import { CoursePopUpDTO } from '../dto/CoursePopUpDTO';
import { BannerDTO } from '../dto/BannerDTO';
import { ClientDTO } from '../dto/ClientDTO';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { SmptSettingsDTO } from '../dto/SmptSettingsDTO';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';
import { GeneralSettingsDTO } from '../dto/GeneralSettingsDTO';
import { InterviewCategoryDTO } from '../dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from '../dto/InterviewQuestionDTO';
import { StudentComplaintsDTO } from '../dto/StudentComplaintsDTO';
import { EventDTO } from '../dto/EventDTO';
import { EnquiryDTO } from '../dto/EnquiryDTO';
import { AddCompanyEnquiriesDTO } from '../dto/AddCompanyEnquiriesDTO';
import { AddTrainerEnquiriesDTO } from '../dto/AddTrainerEnquiriesDTO';
import { StudentJobsDTO } from '../dto/StudentJobsDTO';
import { JobApplicationDTO } from '../dto/JobApplicationDTO';
import { CourseCategoryDTO } from '../dto/CourseCategoryDTO';
import { SeoAnalyticsDTO } from '../dto/SeoAnalyticsDTO';

import { UploadClassNotesDTO } from '../dto/UploadClassNotesDTO';
import { CourseDetailsDTO } from '../dto/CourseDetailsDTO';
import { StudentPaymentDTO } from '../dto/StudentPaymentDTO';
import { JobPostingDTO } from '../dto/JobPostingDTO';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  subModuleData!: SubModuleDTO; 
  moduleData!: ModuleDTO;
  trainersData!: TrainerDTO;
  studentData!: StudentDTO; 
  mockInterviewsData!: MockInterviewsDTO;
  mockInterviewFeeData!:MockInterviewFeeDTO;
  trainersPaymentData!: TrainerPaymentDTO;
  socialSettingsData!: SocialSettingsDTO;
  counsellorData! : CounsellorDTO;
  testimonialData! : TestimonialDTO;
  courseData! : CourseDTO;
  courseDatas : CourseDTO[]=[];
  coursePopUpData!: CoursePopUpDTO;
  bannerData! : BannerDTO;
  ScheduleBatchData! : ScheduleBatchDTO;
  smptSettingsData! : SmptSettingsDTO;
  bannnerPromtionData! :BannerPromotionDTO;
  generalSettingsData! : GeneralSettingsDTO;
  clientData! : ClientDTO;
  interviewCategoryData! :InterviewCategoryDTO;
  interviewQuestionData! :InterviewQuestionDTO;
  interviewQuestionDatas :InterviewQuestionDTO[]=[];
  studentComplaintsData! :StudentComplaintsDTO;
  eventData!: EventDTO;
  enquiryData!:EnquiryDTO;
  addCompanyEnquiriesData! :AddCompanyEnquiriesDTO;
  addTrainerEnquiriesData! :AddTrainerEnquiriesDTO;
  studentJobsData!: StudentJobsDTO;
  editBannerPromotionData!: BannerPromotionDTO ;
  jobApplicationData!: JobApplicationDTO;
  courseCategoryData! : CourseCategoryDTO;
  seoAnalyticsData!: SeoAnalyticsDTO;
  uploadClassNotesData!: UploadClassNotesDTO;
  courseDetailsData!: CourseDetailsDTO;
  studentPaymentData!: StudentPaymentDTO;
  eventDatas : EventDTO[]=[];
  jobPostingData!:JobPostingDTO;
  
  constructor() { }
}

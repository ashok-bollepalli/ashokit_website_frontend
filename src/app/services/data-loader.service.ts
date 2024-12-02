import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplicationDTO } from '../dto/JobApplicationDTO';
import { APP_CONSTANTS } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  private rootUrl: string;

  getCourseBytrainer(traineryId: any) {
    throw new Error('Method not implemented.');
  }
  courseData: any;
  eventData: any;
  constructor(private http: HttpClient) {
    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}` + "data";
  }

  getAllSocialSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllSocialSettings", { headers });
  }

  getAllGeneralSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllGeneralSettings", { headers });
  }

  createJobApplication(jobApplication: JobApplicationDTO, resumeFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('jobApplicationDTO', JSON.stringify(jobApplication));
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/createJobApplication`, formData, { headers });
  }

  addContactUs(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/addContactUs`, data, { headers });
  }

  getAllTrainingSchedules(scheduleType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllTrainingSchedules/${scheduleType}`, { headers });
  }

  getScheduledBatchesByScheduleTypeForEnrollment(scheduleType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getScheduledBatchesByScheduleType/${scheduleType}`, { headers });
  }

  getScheduledBatchesByCategory(categoryId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getScheduledBatchesByCategoryId/${categoryId}`, { headers });
  }

  getAllTrainers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllTrainers", { headers })
  }

  addMockInterviewFees(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addMockInterviewFee", data, { headers });
  }

  getTreandingCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getTreandingCourses", { headers });
  }

  getAllCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourses", { headers });
  }

  getBatchesOpenForEnrollment(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getBatchesOpenForEnrollment", { headers });
  }


  getAllInterviewCategory(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllInterviewCategory", { headers });
  }

  getAllInterviewCategorySubjects(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllInterviewCategorySubjects", { headers });
  }

  getInterviewQuestionByCategory(categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllInterviewQuestionsByCategory/${categoryId}`, { headers });
  }

  getInterviewCategoryBySlug(slugName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getInterviewCategoryBySlugName/${slugName}`, { headers });
  }

  getInterviewQuestionByCategorySlugName(categorySlug: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getInterviewQuestionByCategorySlugName/${categorySlug}`, { headers });
  }

  getCourseCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getCourseCategories", { headers });
  }

  getCourseByCourseCategory(categoryId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseByCategory/" + categoryId, { headers });
  }
  getAllCourseByClassType(classType: string) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseByClassType/" + classType, { headers });
  }

  getCourseByTrainer(trainerId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseByTrainer/" + trainerId, { headers });
  }
  getAllCourseByTrainer(trainerId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseByTrainer/" + trainerId, { headers });
  }

  createDailyLeads(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/createDailyLeads", data, { headers });
  }

  getAllBannerPromotions(displayBannerType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllBannerPromotions/${displayBannerType}`, { headers });
  }

  getAllBanners(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllBanners`, { headers });
  }

  getAllClients(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllClients`, { headers });
  }

  getAllTestimonials(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllTestimonials`, { headers });
  }

  getAllCareers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllCareers`, { headers });
  }

  getAllEvents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getAllEvents`, { headers });
  }

  createStudentComplaints(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/createStudentComplaints", data, { headers });

  }
  getAllStudentsComplaints(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + '/getAllStudentsComplaints', { headers });
  }

  getStudentComplaints(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + '/getStudentComplaints/' + email, { headers });
  }

  addEventRegister(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addEventRegister", data, { headers });
  }
  getAllEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllEnquiries", { headers });
  }

  addCourseRegistration(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addCourseRegistration", data, { headers });
  }
  getAllCoursesForRegistration(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCoursesForRegistration", { headers });
  }
  getAllPaymentSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllPaymentSettings", { headers });
  }

  getTrainingModes(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getTrainingModes", { headers });
  }
  addStudent(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addStudent", data, { headers });
  }

  forgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getForgotPassword/" + email, { headers })
  }
  addStudentRegistration(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addStudentRegistration", data, { headers });
  }
  getAllStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + '/getAllStudents', { headers });
  }
  getAllCountryCodes(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCountryCodes", { headers })
  }

  getAllBatchCodeWithClassNotes(batchCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllBatchCodeWithClassNotes/${batchCode}`, { headers });
  }
  addEducationalDetails(studentEmail: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/addEducationalDetails/${studentEmail}`, data, { headers });
  }
  getStudentByStudentEmail(studentEmail: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getStudentByStudentEmail/${studentEmail}`, { headers });
  }
  updatePassword(email: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/updatePassword/${email}`, data, { headers });
  }

  updatePasswordWithoutLogin(email: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/updatePasswordWithoutLogin/${email}`, data, { headers });
  }
  updateStudentCompanyRegistration(studentEmail: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/updateStudentCompanyRegistration/${studentEmail}`, data, { headers });
  }

  createSocialUserStudentAccount(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/createSocialUserStudentAccount", data, { headers });
  }

  updateStudentProfile(studentEmail: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(`${this.rootUrl}/updateStudentProfile/${studentEmail}`, data, { headers });
  }
  getEventByEventCategory(eventCategoryname: string) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllEventsByCategory/" + eventCategoryname, { headers });
  }

  getEventCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getEventCategories", { headers });
  }

  getEventBySlug(eventSlug: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getEventBySlug/" + eventSlug, { headers });
  }

  getJobPostingsByJobType(jobType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getJobPostingsByJobType/${jobType}`, { headers });
  }

  getJobPostingBySlug(slug: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + `/getJobPostingBySlug/${slug}`, { headers });
  }

  getAllSubModuleByModule(moduleId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllSubModuleByModule/" + moduleId, { headers });
  }
  getAllCourseModules(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseModules", { headers });
  }


  getModulesByCourseId(courseId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getModulesByCourseId/" + courseId, { headers });
  }

  getAllSubModules(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllSubModules", { headers });
  }

  getRegisteredEventsByStudentEmail(studentEmail: String): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getRegisteredEventsByStudentEmail/${studentEmail}`, { headers });
  }

  verifyOTP(phoneNumber: string, otp: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/verifyOTP/${phoneNumber}/${otp}`, { headers });
  }

  getTotalEventRegisteredStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getTotalEventRegisteredStudents`, { headers });
  }
  getTotalRegisteredStudentsForEvent(eventId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getTotalRegisteredStudentsForEvent/${eventId}`, { headers });
  }

  getRegisteredStudentsForEvent(eventId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(`${this.rootUrl}/getRegisteredStudentsForEvent/${eventId}`, { headers });
  }

  generateOTP(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/generateOTP", data, { headers });
  }

  getAllCoursePopUp(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCoursePopups", { headers });
  }
}
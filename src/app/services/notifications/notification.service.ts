import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationDTO } from 'src/app/dto/NotificationDTO';
import { APP_CONSTANTS } from 'src/app/constants';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private rootUrl: string;

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {


    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getAllCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourses", { headers });
  }

  getAllTrainers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllTrainers", { headers });
  }

  getCourseCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getCourseCategories", { headers });
  }
  getTemplateMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getTemplateMessages", { headers });
  }
  sendWatiSMSByBatch(formData: NotificationDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + `/sendWatiSMSByBatch`, formData, { headers });
  }
  sendWatiSMSForDailyLeads(formData: NotificationDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + `/sendWatiSMSForDailyLeads`, formData, { headers });
  }
  sendWatiSMSByRole(templateName: string, role: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + `/sendWatiSMSByRole/${templateName}/${role}`, {}, { headers });
  }
  sendWatiSMSForEvents(templateName: string, eventCategoryId: string, eventId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + `/sendWatiSMSForEvents/${templateName}/${eventCategoryId}/${eventId}`, {}, { headers });
  }
}

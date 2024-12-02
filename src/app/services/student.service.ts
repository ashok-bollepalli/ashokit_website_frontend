import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  getTotalStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getTotalStudents', { headers });
  }
  getTotalRegisteredStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getTotalRegisteredStudents', { headers });
  }

  getAllCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllCourses', { headers });
  }
  getAllTrainers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllTrainers', { headers });
  }
  getAllTrainingSchedules(scheduleType: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getAllTrainingSchedules/${scheduleType}`, { headers });
  }
  getAllBanners() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllBanners', { headers });
  }
  getAllBannerPromotions(displayBannerType: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getAllBannerPromotions/${displayBannerType}`, { headers });
  }

  addExistingStudentToNewBatch(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addExistingStudentToNewBatch", data, { headers })

  }

}


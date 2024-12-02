import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { CourseDTO } from '../dto/CourseDTO';
import { SubModuleDTO } from '../dto/SubModuleDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {



  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }


  updateCategoryTrending(courseId: number, trending: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateCourseTrending/" + courseId + "/" + trending, { headers });
  }
  updateCourseStatus(courseId: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateCourseStatus/" + courseId + "/" + status, { headers });
  }
  addViewModule(moduleData: any) {
    throw new Error('Method not implemented.');
  }

  getCoursesCount(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getCoursesCount", { headers });
  }



  getAllSubModules(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllSubModules", { headers });
  }

  addSubModule(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addSubModule", data, { headers });
  }

  getAllCourseModules(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourseModules", { headers });
  }

  addCourseModule(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addCourseModule", data, { headers });
  }

  updateModule(moduleId: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });

    return this.http.put<any>(`${this.rootUrl}/updateModule/${moduleId}`, data, { headers });
  }
  getAllCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCourses", { headers });
  }

  updateCourseSubModule(subModule: SubModuleDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateCourseSubModule/" + subModule.subModuleId, subModule, { headers });
  }

  updateModuleStatus(moduleId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateModuleStatus/${moduleId}`, { activeStatus: status }, { headers });
  }
  updateCourseSubModuleStatus(subModuleId: number, activeStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateCourseSubModuleStatus/" + subModuleId + "/" + activeStatus, { headers });
  }


  addCourse(course: CourseDTO, coverImageFile: File, courseContentFile: File): Observable<CourseDTO> {

    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('courseContentFile', courseContentFile);
    formData.append('courseDTO', JSON.stringify(course));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<CourseDTO>(this.rootUrl + "/addCourse", formData, { headers });
  }

  updateCourseNew(course: CourseDTO, coverImageFile: File, courseContentFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('courseContentFile', courseContentFile);
    formData.append('courseDTO', JSON.stringify(course));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateCourse/" + course.courseId, formData, { headers });
  }

  updateCourse(course: CourseDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateCourse/" + course.courseId, course, { headers });
  }

  getAllCoursesWithStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCoursesWithStatus", { headers });
  }

}


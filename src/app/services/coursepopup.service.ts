import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { CoursePopUpDTO } from '../dto/CoursePopUpDTO';
import { APP_CONSTANTS } from '../constants';





@Injectable({
  providedIn: 'root'
})
export class CoursePopUpService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getAllCoursePopUp(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCoursePopups", { headers });
  }

  addCoursePopUp(data: any, coverImageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('coursePopUpDto', JSON.stringify(data));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/addCoursePopUp", formData, { headers });
  }

  updateCoursePopup(coursePopup: CoursePopUpDTO, coverImageFile: File): Observable<CoursePopUpDTO> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('coursePopUpDto', JSON.stringify(coursePopup));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<CoursePopUpDTO>(this.rootUrl + "/updateCoursePopup/" + coursePopup.id, formData, { headers });
  }
  updateCoursePopUpStatus(id: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateCoursePopUpStatus/" + id + "/" + status, { headers });
  }

  deleteCoursePopUp(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteCoursePopUp/" + id, { headers });
  }

}

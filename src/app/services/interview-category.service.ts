import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { InterviewCategoryDTO } from '../dto/InterviewCategoryDTO';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InterviewCategoryService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
      
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }



  getAllInterviewCategory(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl  + "/getAllInterviewCategory", { headers });
  }
  addInterviewCategory(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl  + "/addInterviewCategory", data, { headers })

  }
  updateInterviewCategory(interviewCategory: InterviewCategoryDTO): Observable<InterviewCategoryDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl  + "/updateInterviewCategory/" + interviewCategory.categoryId, interviewCategory, { headers });
  }
  deleteInterviewCategory(interviewCategoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl  + "/deleteInterviewCategory/" + interviewCategoryId, { headers });
  }

}

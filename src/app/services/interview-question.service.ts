import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { InterviewQuestionDTO } from '../dto/InterviewQuestionDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }
  getAllInterviewQuestion(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllInterviewQuestion", { headers });
  }

  addInterviewQuestion(interviewQuestion: InterviewQuestionDTO, coverImageFile: File | null): Observable<InterviewQuestionDTO> {
    const formData: FormData = new FormData();

    if (coverImageFile) {
      formData.append('coverImageFile', coverImageFile);
    }

    formData.append('interviewQuestionDTO', JSON.stringify(interviewQuestion));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });

    return this.http.post<InterviewQuestionDTO>(`${this.rootUrl}/addInterviewQuestion`, formData, { headers });
  }


  updateInterviewQuestion(interviewQuestion: InterviewQuestionDTO): Observable<InterviewQuestionDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateInterviewQuestion/" + interviewQuestion.interviewQuestionId, interviewQuestion, { headers });
  }
  getInterviewQuestionByCategory(categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllInterviewQuestionsByCategory/${categoryId}`, { headers });
  }
  getAllInterviewCategory(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllInterviewCategory", { headers });
  }
  createDailyLeads(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/createDailyLeads", data, { headers });
  }
  deleteInterviewQuestion(interviewQuestionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteInterviewQuestion/" + interviewQuestionId, { headers });
  }
}

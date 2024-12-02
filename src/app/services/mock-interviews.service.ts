import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { MockInterviewsDTO } from '../dto/mockInterviewsDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class MockInterviewsService {


  private rootUrl: string;


  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }


  getAllMockInterviews(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllMockInterviews", { headers });
  }
  addMockInterviews(mockInterviews: MockInterviewsDTO, profileImageFile: File, companyLogoFile: File):
    Observable<MockInterviewsDTO> {
    const formData: FormData = new FormData();
    formData.append('profileImageFile', profileImageFile);
    formData.append('companyLogoFile', companyLogoFile);
    formData.append('mockInterviewsDTO', JSON.stringify(mockInterviews));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addMockInterviews", formData, { headers })

  }


  addEmpolyment(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addEmpolyment", data, { headers })
  }
  updateMockInterview(mockInterviews: MockInterviewsDTO): Observable<MockInterviewsDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateMockInterviews/" + mockInterviews.interviewsId, mockInterviews, { headers });
  }
  deleteMockInterview(mockInterviewId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteMockInterview/" + mockInterviewId, { headers });
  }

}



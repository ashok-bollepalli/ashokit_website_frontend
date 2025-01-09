import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StudentBulkUploadService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }

  submitBulkEnrollment(trainerId: number, batchId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("reportProgress", "true");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(`${this.rootUrl}/studentBulkUpload/` + trainerId + "/" + batchId, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  jobLeadsBulkUpload(jobTitle: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("reportProgress", "true");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(`${this.rootUrl}/jobLeadsBulkUpload/` + jobTitle, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  transferOldWebsiteDataToNewWebsite(trainerId: number, batchId: number, previousBatchCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/transferOldWebSiteDataToNew/` + trainerId + "/" + batchId + "/" + previousBatchCode, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllJobLeadsWithTitle(jobTitle: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllJobLeads/` + jobTitle, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllJobLeads(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllJobLeads/`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  submitZoomReport(trainerId: number, batchId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("reportProgress", "true");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(`${this.rootUrl}/uploadStudentZoomReport/` + trainerId + "/" + batchId, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateZoomRegisteredStatus(zoomRegisteredId: number, status: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateZoomRegisteredStatus/" + zoomRegisteredId + "/" + status + "/" + comment, { headers });
  }

}

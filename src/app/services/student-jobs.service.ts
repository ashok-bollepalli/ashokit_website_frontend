import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { StudentJobsDTO } from '../dto/StudentJobsDTO';
import { JobPostingDTO } from '../dto/JobPostingDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class StudentJobsService {

  private rootUrl: string;

  constructor(
    private http: HttpClient,
    private userStorageServices: UserStorageService
  ) {
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }

  getAllStudentsJobs(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllStudentJobs', { headers });
  }

  addStudentJobs(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addStudentJobs", data, { headers });

  }

  updateStudentJobs(studentJobs: StudentJobsDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateStudentJobs/${studentJobs.studentJobsId}`, studentJobs, { headers });
  }

  updateStudentJobsStatus(studentJobsId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateStudentJobsStatus/${studentJobsId}`, { activeStatus: status }, { headers });
  }

  getAllCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getAllCourses`, { headers });
  }

  deleteStudentJob(studentJobsId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteStudentJob/" + studentJobsId, { headers });
  }

  addJobPostings(jobPosting: JobPostingDTO, companyImageFile: File | null): Observable<JobPostingDTO> {
    const formData: FormData = new FormData();

    if (companyImageFile) {
      formData.append('companyImageFile', companyImageFile);
    }

    formData.append('jobPostingsDTO', JSON.stringify(jobPosting));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });

    return this.http.post<JobPostingDTO>(this.rootUrl + "/addJobPostings/", formData, { headers });
  }
  getAlljobPostings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getAllJobPostings`, { headers });
  }

  updateJobPostings(jobPostingsDTOs: JobPostingDTO, companyImageFile?: File): Observable<JobPostingDTO> {
    const formData: FormData = new FormData();
    formData.append('jobPostingsDTO', JSON.stringify(jobPostingsDTOs));

    if (companyImageFile) {
      formData.append('companyImageFile', companyImageFile);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    });

    return this.http.put<JobPostingDTO>(`${this.rootUrl}/updateJobPosting/${jobPostingsDTOs.id}`, formData, { headers });
  }

  deleteJobPostings(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageServices.getToken()}`
    })
    return this.http.delete<any>(this.rootUrl + "/deleteJobPostings/" + id, { headers });
  }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { StudentDTO } from '../dto/StudentDTO';
import { APP_CONSTANTS } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class AddStudentEnrollmentService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getStudentCount(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getStudentCount", { headers });
  }

  getAllStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllStudents", { headers });
  }

  addStudentEnrollment(studebt: StudentDTO): Observable<StudentDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addStudentEnrollment", studebt, { headers });
  }

  updateStudent(student: StudentDTO): Observable<StudentDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateStudent/" + student.studentId, student, { headers });
  }

  updateStudentInfo(student: StudentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateStudentInfo/" + student.studentId, student, { headers });
  }
}

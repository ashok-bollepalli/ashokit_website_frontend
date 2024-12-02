import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursePaymentDetailsDTO } from 'src/app/dto/CoursePaymentDetailsDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { APP_CONSTANTS } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class CoursePaymentService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
    this.rootUrl = APP_CONSTANTS.API_ENDPOINT + "data";
  }

  getBatchPaymentDetails(batchId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getBatchPaymentDetails/" + batchId, { headers });
  }

  getStudentByStudentEmail(studentEmail: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getStudentByStudentEmail/" + studentEmail, { headers });
  }

  addStudent(studentDTO: StudentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addStudent", studentDTO, { headers });
  }

  addStudentPayment(studentPaymentDTO: StudentPaymentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl + "/addStudentPayment", studentPaymentDTO, { headers });
  }

  updateStudentPayment(studentPaymentId: number, razorpayPaymentId: string, enrollmentStatus: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/updateStudentPaymentEnrollStatus/" + studentPaymentId + "/" + razorpayPaymentId + "/" + enrollmentStatus, { headers });
  }

  getStudentPaymentsByCourseBatchAndStudent(courseId: number, batchId: number, studentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getStudentPaymentsByCourseBatchAndStudent/" + courseId + "/" + batchId + "/" + studentId, { headers });
  }

  getCoursesByStudentEmail(studentEmail: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.get<any>(this.rootUrl + "/getCoursesByStudentEmail/" + studentEmail, { headers });
  }


}

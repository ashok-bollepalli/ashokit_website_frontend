import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { ViewPaymentDTO } from '../dto/ViewPaymentDTO';
import { StudentPaymentDTO } from '../dto/StudentPaymentDTO';
import { ZoomRegisteredDTO } from '../dto/ZoomRegisteredDTO';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UsersResponseService {

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

  getAllEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllContactUs", { headers });
  }

  getAllZoomRegisters(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllZoomRegisters", { headers });
  }

  getAllZoomRegistersWithFilter(zoomRegisterDTO: ZoomRegisteredDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/getAllZoomRegistersWithFilter", zoomRegisterDTO, { headers });
  }

  getAllCustomers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllCustomers", { headers });
  }

  getAllPayments() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllPayment", { headers });
  }

  getAllJobApplications(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllJobApplications", { headers });
  }

  getAllLandingPages() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllLandingPageLeads", { headers });
  }


  getAllStudentsComplaints(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllStudentsComplaints', { headers });
  }
  getAllViewPayments(viewPayment: ViewPaymentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/getAllViewPaymentsByFilters", viewPayment, { headers });
  }


  updateDailyLeadStatus(leadId: number, leadStatus: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/updateDailyLeadStatus/" + leadId + "/" + leadStatus + "/" + comment, { headers });
  }


  updateLeadStatus(leadId: number, leadStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/updateDailyLeadStatus/" + leadId + "/" + leadStatus, { headers });
  }


  getAllContactUsEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllContactUs", { headers });
  }
  updateZoomRegisteredStatus(id: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/updateZoomRegisteredStatus/${id}/${status}`, { headers });
  }

  updateStudentComplaintStatus(complaintId: number, complaintStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateStudentComplaintStatus/" + complaintId + "/" + complaintStatus, { headers });
  }

  getAllStudentViewPayments(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllStudentPayments", { headers });
  }
  updateDailyLeadStatusAndComment(leadId: number, leadStatus: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/updateDailyLeadStatusAndComment/" + leadId + "/" + leadStatus + "/" + comment, { headers });
  }

  updateZoomRegisterStatusAndComment(id: number, status: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/updateZoomRegisterStatusAndComment/" + id + "/" + status + "/" + comment, { headers });
  }
  deleteStudentPayment(studentPaymentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.delete<any>(this.rootUrl + "/deleteStudentPayment/" + studentPaymentId, { headers });
  }
  updateStudentPayment(studentPaymet: StudentPaymentDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateStudentPayment/" + studentPaymet.paymentId, studentPaymet, { headers });
  }
  deleteStudentComplaint(studentComplaintId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteStudentComplaint/" + studentComplaintId, { headers });
  }

}
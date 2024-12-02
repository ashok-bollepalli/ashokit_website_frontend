import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnquiryDTO } from 'src/app/dto/EnquiryDTO';
import { APP_CONSTANTS } from 'src/app/constants';



@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

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
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllEnquiries", { headers });
  }

  getEnquriesWithFilter(enquiry: EnquiryDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/getAllEnquiriesFilter", enquiry, { headers });
  }

  addEnquiry(enquiry: EnquiryDTO): Observable<EnquiryDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addEnquiries", enquiry, { headers });
  }

  updateEnquiry(enquiryId: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateEnquiry/" + enquiryId + "/" + status, { headers });
  }

  updateEnquiryStatus(enquiryId: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateEnquiryStatus/" + enquiryId + "/" + status, { headers });
  }

  updateEnquiryStatusAndComments(enquiryId: number, status: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateEnquiryStatusAndComments/" + enquiryId + "/" + status + "/" + comment, { headers });
  }


  updateEnquiryPaymentStatus(id: number, paymentStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateEnquiryPaymentStatus/" + id + "/" + paymentStatus, { headers });
  }
  getAllCountryCodes(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCountryCodes", { headers })
  }
  updateContactUsEnquiryStatusAndComments(enquiryId: number, leadStatus: string, comment: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateContactUsEnquiryStatusAndComments/" + enquiryId + "/" + leadStatus + "/" + comment, { headers });
  }
}

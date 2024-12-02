import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { PaymentSettingsDTO } from '../dto/PaymentSettingsDTO';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentSettingsService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }

  getAllPaymentSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllPaymentSettings", { headers });
  }

  getAllStudentPayments(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllStudentPayments", { headers });
  }

  getPendingViewEnrollments(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getPendingViewEnrollments", { headers });
  }

  updateFrontOfcMsg(paymentId: number, followupStatus: string, frontOfcMsg: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/updateViewEnrollmentFrontOfcMsg/" + paymentId + "/" + followupStatus + "/" + frontOfcMsg, { headers });
  }

  addPaymentSettings(paymentSettings: PaymentSettingsDTO, image: File): Observable<PaymentSettingsDTO> {

    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('paymentSettingsDTO', JSON.stringify(paymentSettings));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<PaymentSettingsDTO>(this.rootUrl + "/addPaymentSettings", formData, { headers })

  }

}

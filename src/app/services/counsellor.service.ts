import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { CounsellorDTO } from '../dto/CounsellorDTO';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }

  getAllCounsellors(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCounsellors", { headers });
  }
  getAllCounsellorsWithStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCounsellorsWithStatus", { headers });
  }
  addCounsellor(counsellor: CounsellorDTO): Observable<CounsellorDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addCounsellors", counsellor, { headers });
  }

  updateCounsellorStatus(counsellorId: number, activeStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateCounsellorStatus/" + counsellorId + "/" + activeStatus, { headers });
  }

  modifyCounsellorStatus(counsellorId: number, activeStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/modifyCounsellorStatus/" + counsellorId + "/" + activeStatus, { headers });
  }

  updateCounsellor(counsellor: CounsellorDTO): Observable<CounsellorDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(this.rootUrl + "/updateCounsellors/" + counsellor.counsellorId, counsellor, { headers });
  }

  getTotalOpenEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getTotalOpenEnquiries`, { headers });
  }
  getTotalClosedEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getTotalClosedEnquiries`, { headers });
  }
  getTotalLostEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getTotalLostEnquiries`, { headers })
  }
  getTotalEnquiries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + `/getTotalEnquiries`, { headers })
  }
}

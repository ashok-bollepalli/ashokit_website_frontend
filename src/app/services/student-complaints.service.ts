import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class StudentComplaintsService {
  private rootUrl = APP_CONSTANTS.API_ENDPOINT;

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {
    const module = this.userStorageService.getRole()?.toLocaleLowerCase();
    this.rootUrl = this.rootUrl + module;
  }


  updateStudentComplaintStatus(complaintId: number, complaintStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateStudentComplaintStatus/" + complaintId + "/" + complaintStatus, { headers });
  }

}
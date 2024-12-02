import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { APP_CONSTANTS } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class TeachableService {

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

  getAllTeachableCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + '/getAllTeachableCourses', { headers });
  }


}

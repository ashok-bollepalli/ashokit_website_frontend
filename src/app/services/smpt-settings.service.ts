import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserStorageService } from './user-storage.service';
import { APP_CONSTANTS } from '../constants';





@Injectable({
  providedIn: 'root'
})
export class SmptSettingsService {


  private rootUrl: string;

  [x: string]: any;



  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {


    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  addSmptSettings(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/addSmptSettings", data, { headers });
  }

  getSmptSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getSmptSettings", { headers });
  }


}

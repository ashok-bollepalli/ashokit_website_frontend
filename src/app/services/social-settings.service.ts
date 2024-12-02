import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { SocialSettingsDTO } from '../dto/SocialSettingsDTO';
import { APP_CONSTANTS } from '../constants';




@Injectable({
  providedIn: 'root'
})
export class SocialSettingsService {

  private rootUrl: string;


  constructor(private http: HttpClient,
    private userStorageService: UserStorageService
  ) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  addSocialSettings(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addSocialSettings", data, { headers });
  }
  getAllSocialSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    })
    return this.http.get<any>(this.rootUrl + "/getAllSocialSettings", { headers });
  }
  updateSocialSettings(socialSetting: SocialSettingsDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateSocialSettings/" + socialSetting.id, socialSetting, { headers });
  }
  updateSocialSettingsStatus(id: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateSocialSettingsStatus/" + id + "/" + status, { headers });
  }
}

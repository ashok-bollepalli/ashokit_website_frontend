import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { GeneralSettingsDTO } from '../dto/GeneralSettingsDTO';
import { APP_CONSTANTS } from '../constants';





@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }




  addGeneralSettings(generalSetting: GeneralSettingsDTO, logoDark: File, favIcon: File): Observable<GeneralSettingsDTO> {

    const formData: FormData = new FormData();
    formData.append('logoDark', logoDark);
    formData.append('favIcon', favIcon);
    formData.append('generalSettingsDTO', JSON.stringify(generalSetting));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<GeneralSettingsDTO>(this.rootUrl + "/addGeneralSettings", formData, { headers });
  }



  getAllGeneralSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllGeneralSettings", { headers });
  }


  createSeoAnalytics(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/createSeoAnalytics", data, { headers });
  }
}

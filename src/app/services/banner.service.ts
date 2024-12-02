import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { BannerDTO } from '../dto/BannerDTO';
import { APP_CONSTANTS } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private rootUrl: string;


  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }

  getAllBanners(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/allBanners", { headers });
  }

  addBanner(banner: BannerDTO, coverImageFile: File): Observable<BannerDTO> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('bannerDTO', JSON.stringify(banner));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/addBanner", formData, { headers });
  }
  updateBanner(banner: BannerDTO, coverImageFile: File): Observable<BannerDTO> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('bannerDTO', JSON.stringify(banner));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateBanner/" + banner.id, formData, { headers });
  }

  updateBannerStatus(bannerId: number, status: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateBannerStatus/" + bannerId + "/" + status, { headers });
  }

  deleteBanner(bannerId: number, coverImageName: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteBanner/" + bannerId + "/" + coverImageName, { headers });
  }

}

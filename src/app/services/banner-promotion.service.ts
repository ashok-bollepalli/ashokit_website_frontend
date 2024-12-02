import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { BannerPromotionDTO } from '../dto/BannerPromotionDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class BannerPromotionService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {
      
    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  addBannerPromotions(data: any, coverImageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('bannerPromotionDTO', JSON.stringify(data));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    })

    return this.http.post<any>(this.rootUrl + "/addBannerPromotions", formData, { headers })
  }

  upDateBannerPromotions(bannerPromotion: BannerPromotionDTO, coverImageFile: File): Observable<BannerPromotionDTO> {
    const formData: FormData = new FormData();
    formData.append('coverImageFile', coverImageFile);
    formData.append('bannerPromotionDTO', JSON.stringify(bannerPromotion));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    })
    return this.http.put<any>(this.rootUrl + "/upDateBannerPromotionById/" + bannerPromotion.id, formData, { headers })
  }

  getAllBannerPromotion(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    })

    return this.http.get<any>(this.rootUrl + "/getAllBannerPromotions", { headers })
  }

  upDateBannerPromotionstatus(id: number, status: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    })
    return this.http.put<any>(`${this.rootUrl}/upDateBannerPromotionById/${id}`, { status }, { headers })
  }

  updateBannerPromotionStatus(id: number, status: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateBannerPromotionStatus/" + id + "/" + status, { headers });
  }

  deleteBannerPromotion(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteBannerPromotion/" + id, { headers });
  }

}
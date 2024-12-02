import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { TestimonialDTO } from '../dto/TestimonialDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

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

  getAllTestimonial(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    })
    return this.http.get<any>(this.rootUrl + "/getAllTestimonials", { headers });
  }

  addTestimonial(testimonial: TestimonialDTO, imageFile: File,): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('testimonialDTO', JSON.stringify(testimonial));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addTestimonials", formData, { headers });
  }

  updateTestimonial(testimonial: TestimonialDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateTestimonial/" + testimonial.id, testimonial, { headers });
  }

  updateTestimonialStatus(id: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateTestimonialStatus/" + id + "/" + status, { headers });
  }
  deleteTestimonial(testimonialId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteTestimonial/" + testimonialId, { headers });
  }

}

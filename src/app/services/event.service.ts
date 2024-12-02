import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { EventDTO } from '../dto/EventDTO';
import { APP_CONSTANTS } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class EventService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getAllEvents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllEvents", { headers });
  }

  getEventRegistrations(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getEventRegistrations", { headers });
  }

  addEvents(event: EventDTO, eventThumbnailFile: File, eventBannerFile: File): Observable<EventDTO> {
    const formData: FormData = new FormData();
    formData.append('eventThumbnailFile', eventThumbnailFile);
    formData.append('eventBannerFile', eventBannerFile);
    formData.append('eventDTO', JSON.stringify(event));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<EventDTO>(this.rootUrl + "/addEvents", formData, { headers });
  }
  updateEvents(event: EventDTO, eventThumbnailFile: File, eventBannerFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('eventThumbnailFile', eventThumbnailFile);
    formData.append('eventBannerFile', eventBannerFile);
    formData.append('eventDTO', JSON.stringify(event));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateEvents/" + event.eventId, formData, { headers });
  }
  updateEventStatus(eventId: number, eventStatus: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateEventStatus/" + eventId + "/" + eventStatus, { headers });
  }
  deleteEvent(eventId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteEvent/" + eventId, { headers });
  }
  updateActiveSw(eventId: number, activeSw: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateActiveSw/" + eventId + "/" + activeSw, { headers });
  }
  getEventCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getEventCategories", { headers });
  }
}

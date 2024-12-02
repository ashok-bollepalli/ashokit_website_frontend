import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { ScheduleBatchDTO } from '../dto/ScheduleBatchDTO';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class BatchesScheduleService {


  private rootUrl: string;

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;

  }
  getAllScheduledBatches(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllScheduledBatches", { headers });
  }

  getAllScheduledBatchesWithFilter(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/getAllScheduledBatchesWithFilter", data, { headers });
  }

  transferBatch(sourceBatchId: number, targetBatchId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/transferBatches/" + sourceBatchId + "/" + targetBatchId, { headers });
  }

  addNewBatch(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addNewBatch", data, { headers });

  }

  updateScheduleBatch(batch: ScheduleBatchDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateScheduleBatch/${batch.id}`, batch, { headers });
  }

  getAllBatchNotesByTrainer(trainerId: number, batchCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/getAllBatchNotesByTrainer/${trainerId}/${batchCode}`, { headers });
  }

  getScheduleBatchByTrainer(trainerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(`${this.rootUrl}/getScheduleBatchByTrainer/${trainerId}`, { headers });
  }

}

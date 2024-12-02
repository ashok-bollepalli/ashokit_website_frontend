
import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainerDTO } from '../dto/TrainerDTO';
import { TrainerPaymentDTO } from '../dto/TrainerPaymentDTO';
import { APP_CONSTANTS } from '../constants';




@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService
  ) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }


  getAllTrainers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllTrainers", { headers });
  }



  addTrainer(trainer: TrainerDTO, resumeFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('trainerDTO', JSON.stringify(trainer));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addTrainer", formData, { headers });

  }
  updateTrainer(trainer: TrainerDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateTrainer/${trainer.trainerId}`, trainer, { headers });
  }
  updateTrainerStatus(trainerId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateTrainerStatus/${trainerId}`, { activeStatus: status }, { headers });
  }

  getAllTrainerPayments(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllTrainerPayments", { headers });
  }

  addTrainerPayment(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<any>(this.rootUrl + "/addTrainerPayment", data, { headers });

  }
  updateTrainerPayment(trainerPayment: TrainerPaymentDTO): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateTrainerPayment/${trainerPayment.paymentId}`, trainerPayment, { headers });
  }
  updateTrainerActiveStatus(trainerId: number, status: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/updateTrainerActiveStatus/" + trainerId + "/" + status, { headers });
  }
  modifyTrainerStatus(trainerId: number, activeStatus: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/modifyTrainerStatus/" + trainerId + "/" + activeStatus, { headers });
  }
  getAllCountryCodes(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.get<any>(this.rootUrl + "/getAllCountryCodes", { headers });
  }
  deleteTrainer(trainerId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteTrainer/" + trainerId, { headers });
  }
  deleteTrainerPayment(trainerPaymentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteTrainerPayment/" + trainerPaymentId, { headers });
  }
  getAllTrainersWithStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllTrainersWithStatus", { headers });
  }
}

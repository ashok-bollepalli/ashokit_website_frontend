import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadClassNotesDTO } from 'src/app/dto/UploadClassNotesDTO';
import { APP_CONSTANTS } from 'src/app/constants';



@Injectable({
  providedIn: 'root'
})
export class UploadClassNoteService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {


    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getAllCassNote(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllClassNotes", { headers });
  }

  addClassNote(uploadClassNotes: UploadClassNotesDTO, uploadProfile: File): Observable<UploadClassNotesDTO> {

    const formData: FormData = new FormData();
    formData.append('uploadProfile', uploadProfile);
    formData.append('uploadClassNotesDTO', JSON.stringify(uploadClassNotes));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.post<UploadClassNotesDTO>(this.rootUrl + "/addClassNotes", formData, { headers });
  }

  updateClassNotes(uploadClassNotes: any, uploadProfile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('uploadProfile', uploadProfile);
    formData.append('uploadClassNotesDTO', JSON.stringify(uploadClassNotes));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.put<any>(`${this.rootUrl}/updateClassNotes/${uploadClassNotes.notesId}`, formData, { headers });
  }

  deleteNotes(notesId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteClassNotes/" + notesId, { headers });
  }

}

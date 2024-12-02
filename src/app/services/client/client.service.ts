import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage.service';
import { Observable } from 'rxjs';
import { ClientDTO } from 'src/app/dto/ClientDTO';
import { APP_CONSTANTS } from 'src/app/constants';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private rootUrl: string;

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) {

    // Retrieve role and ensure it's a lowercase string
    const module = UserStorageService.getRole()?.toLocaleLowerCase() || '';

    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}${module}`;
  }

  getAllClients(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.get<any>(this.rootUrl + "/getAllClients", { headers });
  }
  addClient(client: ClientDTO, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('clientDTO', JSON.stringify(client));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.post<any>(this.rootUrl + "/addClient", formData, { headers });
  }
  updateClient(client: ClientDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.userStorageService.getToken()
    });
    return this.http.put<any>(this.rootUrl + "/updateClient/" + client.id, client, { headers });
  }
  deleteClient(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userStorageService.getToken()}`
    });
    return this.http.delete<any>(this.rootUrl + "/deleteClient/" + id, { headers });
  }

}

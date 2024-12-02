import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl: string;

  constructor(private http: HttpClient) {
    // Construct the full URL
    this.rootUrl = `${APP_CONSTANTS.API_ENDPOINT}` + "users/authenticate";
  }


  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ashokit`
    });
    return this.http.post<any>(this.rootUrl, { email, password }, { headers });
  }
}

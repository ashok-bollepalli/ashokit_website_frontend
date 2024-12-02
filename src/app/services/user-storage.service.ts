import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly SOCIAL_USER_KEY = 'social_user_key';
  private readonly TRAINER_KEY ='trainer';
  private readonly STUDENT_KEY = 'student';
  private readonly COUNSELLOR_KEY = 'counsellor';
 
  

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getSocialUser(): SocialUser | null {
    const user = localStorage.getItem(this.SOCIAL_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  setSocialUser(socialUser: SocialUser): void {
    localStorage.setItem(this.SOCIAL_USER_KEY, JSON.stringify(socialUser));
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

 static getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  setRole(role: string): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getTrainer(): any | null {
    const trainer = localStorage.getItem(this.TRAINER_KEY);
    return trainer ? JSON.parse(trainer): null;
  }
  setTrainer(trainer: any): void {
  localStorage.setItem(this.TRAINER_KEY, JSON.stringify(trainer));
  }
  getStudent(): any | null {
    const student = localStorage.getItem(this.STUDENT_KEY);
    return student ? JSON.parse(student) : null;
  }

  setStudent(student: any): void {
    localStorage.setItem(this.STUDENT_KEY, JSON.stringify(student));
  }

  getCounsellor(): any | null {
    const counsellor = localStorage.getItem(this.COUNSELLOR_KEY);
    return counsellor ? JSON.parse(counsellor) : null;
  }
  setCounsellor(counsellor: any): void {
    localStorage.setItem(this.COUNSELLOR_KEY, JSON.stringify(counsellor));
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.TRAINER_KEY);
    localStorage.removeItem(this.STUDENT_KEY);
  }
}

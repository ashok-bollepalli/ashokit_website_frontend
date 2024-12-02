import { CanActivateFn } from '@angular/router';



import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from './services/user-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userStorageService: UserStorageService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.userStorageService.getRole();
    if (userRole === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/access-denied']); 
      return false;
    }
  }
}


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from './services/user-storage.service';


@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private userStorageService: UserStorageService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.userStorageService.getRole();
    if (userRole === 'SUPERADMIN') {
      return true;
    } else {
      this.router.navigate(['/access-denied']); 
      return false;
    }
  }
}

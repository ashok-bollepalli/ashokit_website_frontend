import { Component, ViewChild } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { DataSharingService } from '../services/sharing/data-sharing.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private userStorageService: UserStorageService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  isLoggedIn(): boolean {
    // Check if token exists in user storage
    return !!this.userStorageService.getToken();
  }

  getRole():string |null {
    return this.userStorageService.getRole();
  }
  logout(): void {
    const socialUser = this.userStorageService.getSocialUser();
    if (socialUser) {
      this.socialAuthService.signOut().then(() => {
        this.userStorageService.clearStorage();
        this.router.navigate(['/home']);
      }).catch(error => {
        console.error('Error occurred while signing out:', error);
      });
    } else {
      this.userStorageService.clearStorage();
      this.router.navigate(['/home']);
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  
  scrollTo(identification: string){
    this.dataSharingService.scrollTo(identification)
  }

  Placements(){
    this.router.navigate(['/placements']);
  }

}

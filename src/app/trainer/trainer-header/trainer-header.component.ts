import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.scss']
})
export class TrainerHeaderComponent {
  constructor(private userStorageService: UserStorageService,
              private socialAuthService : SocialAuthService,
              private router: Router

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
    if(socialUser){
      this.socialAuthService.signOut();
    }
    
    this.userStorageService.clearStorage();
    this.router.navigate(['/login']);
    
  }
}

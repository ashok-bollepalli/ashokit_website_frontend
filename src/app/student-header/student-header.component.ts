import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss']
})
export class StudentHeaderComponent implements OnInit {
  socialUser!: SocialUser | null;
  constructor(private userStorageService: UserStorageService,
    private socialAuthService : SocialAuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.socialUser =this.userStorageService.getSocialUser();
  }

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
        this.router.navigate(['/login']);
    //    this.reloadPage();
      }).catch(error => {
        this.userStorageService.clearStorage();
        this.router.navigate(['/login']);
   //     this.reloadPage();
      });
    } else {
      this.userStorageService.clearStorage();
      this.router.navigate(['/login']);
    //  this.reloadPage();
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserStorageService } from './services/user-storage.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { DataLoaderService } from './services/data-loader.service';
import { CourseCategoryDTO } from './dto/CourseCategoryDTO';
import { DataServiceService } from './services/data-service.service';
import { TrainerDTO } from './dto/TrainerDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'institute_management_system_frontend';
  trainer: any | null = null; // Define trainer variable
  student: any | null = null; // Define student variable
  cardVisible = false;
  closeTimeout: any;

  constructor(
    private userStorageService: UserStorageService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit() {
    this.trainer = this.userStorageService.getTrainer(); // Initialize trainer data
    this.student = this.userStorageService.getStudent(); // Initialize student data
  }
  isLoggedIn(): boolean {
    // Check if token exists in user storage
    return !!this.userStorageService.getToken();
  }

  getRole(): string | null {
    return this.userStorageService.getRole();
  }

  removeAllKeysInLocalStorage(): void {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }

  logout(): void {
    const socialUser = this.userStorageService.getSocialUser();
    if (socialUser) {
      this.userStorageService.clearStorage();
      this.socialAuthService
        .signOut()
        .then(() => {
          this.userStorageService.clearStorage();
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Error occurred while signing out:', error);
        });
      this.router.navigate(['/login']);
    } else {
      this.userStorageService.clearStorage();
      this.router.navigate(['/home']);
    }
  }
  getCurrentRoute(): string {
    return this.router.url; // Get the current route URL
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToProfile() {
    this.router.navigate(['/student/personal-details']);
  }

  openModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }

  showCard() {
    this.cardVisible = true;
    this.resetCloseTimer();
  }

  hideCard() {
    this.closeTimeout = setTimeout(() => {
      this.cardVisible = false;
    }, 3000);
  }

  resetCloseTimer() {
    clearTimeout(this.closeTimeout);
  }

  disableRightClick(event: MouseEvent){
      event.preventDefault();
  }
}

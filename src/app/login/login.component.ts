import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user-storage.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { CoursePopUpDTO } from '../dto/CoursePopUpDTO';
import { CoursePopUpService } from '../services/coursepopup.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  socialUser!: SocialUser;
  studentEmail!: string;
  pwdUpdated!: string;
  public submitted = false;
  public coursePopUps: CoursePopUpDTO | null = null;

 coverImage:string | null = null;
  public popupAvailable=false;



  constructor(
    private authService: AuthService,
    private router: Router,
    private userStorageService: UserStorageService,
    private socialAuthService: SocialAuthService,
    private dataLoaderService: DataLoaderService,
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef,
    private meta: Meta, private titleService: Title
  ) { }
  loginForm: any;
  ngOnInit() {
    this.setMetaTags();
    this.getAllCoursePopUp();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.userStorageService.setSocialUser(this.socialUser);
      this.userStorageService.setToken(this.socialUser?.idToken);
      this.userStorageService.setRole("STUDENT");
      //this.cdr.detectChanges();
      this.redirectBasedOnRole("STUDENT");
    });
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Ashok IT | Login');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.dataLoaderService.createSocialUserStudentAccount(this.socialUser);
      this.socialUser = user;
      this.userStorageService.setToken(this.socialUser?.authToken);
      this.userStorageService.setRole("STUDENT");
      this.redirectBasedOnRole("STUDENT");
    });
  }



  removeAllKeysInLocalStorage(): void {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  login(loginForm: NgForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.userStorageService.clearStorage();
      localStorage.clear();
      sessionStorage.clear();
      this.removeAllKeysInLocalStorage();
      const socialUser = this.userStorageService.getSocialUser();
      if (socialUser) {
        this.socialAuthService.signOut();
      }
      const { email, password } = loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          this.userStorageService.setToken(response.token);
          this.userStorageService.setRole(response.role);
          this.userStorageService.setTrainer(response.trainer);
          this.userStorageService.setStudent(response.student);
          this.userStorageService.setCounsellor(response.counsellor);
          this.redirectBasedOnRole(response.role);

        },
        (error: any) => {
          this.errorMessage = 'Invalid Email or Password.';
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }
  private redirectBasedOnRole(role: string): void {

    this.dataLoaderService.getAllCourses();
    switch (role) {
      case 'STUDENT':
        this.pwdUpdated = this.userStorageService.getStudent().pwdUpdated;
        console.log("pwd updated:"+ this.pwdUpdated);
        if(this.pwdUpdated === 'Yes'){
          this.router.navigate(['/student/my-courses']);          
        }else{
          this.router.navigate(['/student/change-password']);
        }
        break;
      case 'COUNSELLOR':
        this.router.navigate(['/counselor/home']);
        break;
      case 'TRAINER':
        this.router.navigate(['/trainer/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/home']);
        break;
      case 'SUPERADMIN':
        this.router.navigate(['/super-admin/home']);
        break;
      // Add cases for other roles
      default:
        // Handle unknown role or redirect to a default page
        break;
    }
  }

  getAllCoursePopUp() {
    this.dataLoaderService.getAllCoursePopUps().subscribe(
      (res) => {
        this.coursePopUps = res.data[0];
        if(this.coursePopUps!=null){
          this.coverImage = this.coursePopUps.coverImage;
          this.popupAvailable=true;
        }       
      },
      (error) => {
        console.error('Error fetching course popups:', error);
      }
    );
  }
}

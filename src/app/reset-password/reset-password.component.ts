import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { NewPasswordDTO } from '../dto/NewPasswordDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  studentEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  errorMessage: string | null = null;
  successMsg: string | null = null;

  constructor(
    private dataLoaderService: DataLoaderService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private meta: Meta, private titleService: Title,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.setMetaTags();
    this.route.queryParams.subscribe(
      params => {
        this.studentEmail = params['email'];
      }
    );
  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Ashok IT | Login');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }


  onSubmit(): void {
    this.errorMessage='';
    this.successMsg='';
    if (this.newPassword === this.confirmPassword) {
      const newPasswordDTO: NewPasswordDTO = {
        currentPassword: this.newPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      };
      this.dataLoaderService.updatePasswordWithoutLogin(this.studentEmail, newPasswordDTO).subscribe(
        res => {
          //this.toaster.success("Password updated successfully, Proceed To Login");
          //this.router.navigate(["/login"]);
          this.successMsg = "Password updated successfully, Proceed To Login";
        },
        (error: any) => {
          this.errorMessage = "Failed To Update Password!";
        }
      );
     } else {
      //this.toaster.error("New Password and Confirm Password should be same");
      this.errorMessage = "New Password and Confirm Password should be same";
    }

  }

}
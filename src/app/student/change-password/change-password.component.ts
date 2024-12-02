import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewPasswordDTO } from 'src/app/dto/NewPasswordDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  studentEmail: string ="";
  socialUser!: SocialUser | null;
  student: any;
  currentPassword:string ='';
  newPassword:string ='';
  confirmPassword:string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private dataLoaderService: DataLoaderService, 
    private toaster: ToastrService,
    private userStorageService: UserStorageService,) { }

  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    this.student = this.userStorageService.getStudent();
    let studentEmail = this.socialUser?.email;
    this.studentEmail = studentEmail?studentEmail:"";
      if(!studentEmail && studentEmail!=""){
          studentEmail = this.userStorageService.getStudent().studentEmail;
          this.studentEmail = studentEmail?studentEmail:"";
      }  

  }

    
  onSubmit(){
    if(this.newPassword != this.confirmPassword){
      this.errorMessage = 'New Password And Confirm Password Should Be Same !';
      return;
    }

    if (this.currentPassword !="" && this.newPassword === this.confirmPassword) {
      const newPasswordDTO :NewPasswordDTO = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      }
      this.dataLoaderService.updatePassword(this.studentEmail, newPasswordDTO).subscribe(
        res => {
          this.errorMessage = '';
          this.successMessage = 'Your Account Password Updated Successfully';
          this.toaster.success('Password Updated Successfully');
        }
      )
    }else{
     // this.toaster.error('Please enter data');
      this.errorMessage = 'All fields are mandatory';
    }
  }

}

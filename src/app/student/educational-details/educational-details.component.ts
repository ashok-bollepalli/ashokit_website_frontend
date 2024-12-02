import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {

  educationalDetailsForm: FormGroup = this.formBuilder.group({});
  studentEmail: string = "";
  socialUser!: SocialUser | null;
  student: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private dataLoaderService: DataLoaderService,
    private userStorageService: UserStorageService,

  ) { }

  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    this.student = this.userStorageService.getStudent();
    let studentEmail = this.socialUser?.email;
    this.studentEmail = studentEmail ? studentEmail : "";
    if (!studentEmail && studentEmail != "") {
      this.student = this.userStorageService.getStudent();
      studentEmail = this.userStorageService.getStudent().studentEmail;
      this.studentEmail = studentEmail ? studentEmail : "";
    }
    if (!this.student) {
      this.dataLoaderService.getStudentByStudentEmail(this.studentEmail).subscribe(res => {
        this.student = res.data;     
      });
    }
    this.educationalDetailsForm = this.formBuilder.group({           
      university: [this.student.university, Validators.required],
      graduationPercentage: [this.student.graduationPercentage],
      graduationYear: [this.student.graduationYear, Validators.required],          
      higherEducation: [this.student.higherEducation, Validators.required],
      specialization: [this.student.specialization, Validators.required],
      percentage: [this.student.percentage, Validators.required]
    })


  }

  onSubmit() {
    if (this.educationalDetailsForm.valid) {
      const educationalDetailsData = this.educationalDetailsForm.value;
      this.dataLoaderService.addEducationalDetails(this.studentEmail, educationalDetailsData).subscribe(
        res => {
          this.student = res.data;
          this.toaster.success('Data updated Successfully');
        }
      )
    } else {
      this.toaster.error('Enter Mandatory Fields Data');
    }
  }

}
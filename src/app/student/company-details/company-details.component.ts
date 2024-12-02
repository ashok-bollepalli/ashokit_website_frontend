import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {


  studentCompanyRegistrationForm: FormGroup = this.formBuilder.group({});
  studentEmail: string = "";
  socialUser!: SocialUser | null;
  student: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService) {

  }
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

    this.studentCompanyRegistrationForm = this.formBuilder.group({
      lookingForJob: [this.student.lookingForJob, Validators.required],
      jobTrialsAs: [this.student.jobTrialsAs, Validators.required],
      trainingStatus: [this.student.trainingStatus, Validators.required],
      companyName: [this.student.companyName],
      salary: [this.student.salary],
      linkedinProfile: [this.student.linkedinProfile, Validators.required],
      exp: [this.student.exp],
      skills: [this.student.skills, Validators.required],
      techSkills: [this.student.techSkills, Validators.required],
    })
  }


  onSubmit() {
    if (this.studentCompanyRegistrationForm.valid) {
      const studentCompanyData = this.studentCompanyRegistrationForm.value;
      this.dataLoaderService.updateStudentCompanyRegistration(this.studentEmail, studentCompanyData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
      })
    }else{
      this.toaster.error('Enter Mandatory Fields Data');
    }
  }

}

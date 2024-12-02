import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm: FormGroup = this.formBuilder.group({});
  students: StudentDTO[] = [];
  socialUser!: SocialUser | null;
  public countryCodes: CountryCodeDTO[] = [];
  studentEmail: string = "";
  student: any;

  public studentData: StudentDTO = {
    studentId: 0,
    studentEmail: '',
    mobileNumber: '',
    fullName: '',
    lastName: '',
    gender: '',
    countryCode: '',
    courseStatus: '',
    courseId: 0,
    amountPaid: 0,
    dueAmount: 0,
    password: '',
    passwordUpdated: '',
    higherEducation: '',
    specialization: '',
    graduationYear: '',
    university: '',
    profilePhoto: '',
    placementStatus: '',
    emailSubscriber: '',
    messageSubscriber: '',
    trainerId: 0,
    counsellorId: 0,
    videosAccess: '',
    classType: '',
    batchId: 0,
    companyName: '',
    salary: '',
    exp: '',
    aadhar:'',
    jobTrialsAs: '',
    linkedinProfile: '',
    lookingForJob:'',
    trainingStatus:'',
    createdDate: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private userStorageService: UserStorageService,
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.socialUser = this.userStorageService.getSocialUser();
    this.student = this.userStorageService.getStudent();
    let studentEmail = this.socialUser?.email;
    this.studentEmail = studentEmail ? studentEmail : "";
    if (!studentEmail && studentEmail != "") {
      this.studentData = this.userStorageService.getStudent();
      studentEmail = this.userStorageService.getStudent().studentEmail;
      this.studentEmail = studentEmail ? studentEmail : "";
    }


    this.personalDetailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      aadhar: ['', Validators.required],
      studentEmail: ['', Validators.required],
      gender: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobileNumber: ['', Validators.required]

    })

    this.getAllCountryCodes();
  }



  onSubmit() {
    if (this.personalDetailsForm.valid) {
      const studentProfileDetailes = this.personalDetailsForm.value;
      this.dataLoaderService.updateStudentProfile(this.studentEmail, studentProfileDetailes).subscribe(
        res => {
          this.toaster.success('Data Updated Successfully');
        }
      )
    }else{
      this.toaster.error('Enter Mandatory Fields');
    }
  }


  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }
}

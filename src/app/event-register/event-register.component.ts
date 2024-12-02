import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { EventDTO } from '../dto/EventDTO';
import { DataServiceService } from '../services/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { EventRegisterDTO } from '../dto/EventRegisterDTO';
import { OTPDTO } from '../dto/OTPDTO';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.scss']
})
export class EventRegisterComponent implements OnInit {

  public eventSlug: any;
  eventRegisterForm: FormGroup = this.formBuilder.group({});
  eventRegOtpForm: FormGroup = this.formBuilder.group({});
  public event: any;
  public eventRegister: any;
  public countryCodes: CountryCodeDTO[] = [];


  showOtpScreen: boolean = false;
  errorMessage: string | null = null;

  public otpStatus!: string;
  public regCnt: any;

  public selectedEventRegister: OTPDTO = {
    id: 0,
    email: '',
    mobileNumber: '',
    otp: '',
    otpStatus: '',
    emailStatus: ''
  }

  public otp: any;
  isLoading: boolean = false;
  public submitted = false;
  totalRegisteredStudents: number = 0;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private dataServiceService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.event = this.dataServiceService.eventData;

    if (this.event == null) {
      // Synchronous way (using snapshot)
      this.eventSlug = this.route.snapshot.paramMap.get('eventSlug');
      this.event = this.getEventDataByEventSlug(this.eventSlug);
    }

    this.regCnt = this.dataServiceService.eventData.registeredCount;

    this.eventRegisterForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required]],
      countryCode: ['91', Validators.required],
      mobileNumber: ['', Validators.required],
      eventCategoryId: [this.event.eventCategoryId, Validators.required],
      eventId: [this.event.eventId, Validators.required]
    });


    this.eventRegOtpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });

    this.getAllCountryCodes();
    this.getTotalRegisteredStudentsForEvent();
  }

  onSubmit() {
    this.submitted = true;

    if (this.eventRegisterForm.invalid) {
      this.toastrService.error('Please fill out all mandatory fields.', 'Error');
      return;
    }

    this.isLoading = true;
    const formData = this.eventRegisterForm.value;

    this.dataLoaderService.addEventRegister(formData).subscribe(
      (res: any) => {
        this.isLoading = false;
        //this.eventRegisterForm.reset();
        this.selectedEventRegister = res.data;

        if (this.selectedEventRegister.otpStatus == 'Pending') {
          this.errorMessage = '';
          this.showOtpScreen = false;
          this.toastrService.success('Registration Success, Please check your Email for Event Details');
          this.router.navigate(['/registration-success']);
        } else if (this.selectedEventRegister.otpStatus == 'Verified') {
          this.eventRegisterForm.reset();        
          this.toastrService.success('Registration Success, Please check your Email for Event Details');
          this.router.navigate(['/registration-success']);
        }
        this.submitted = false;

      },
      (error) => {
        this.isLoading = false;
        this.toastrService.error('Registration failed !');
      }
    );
  }

  getEventDataByEventSlug(eventSlug: any) {
    console.log("slug:" + eventSlug)
    this.dataLoaderService.getEventBySlug(eventSlug).subscribe(res => {
      this.event = res.data;
    })
  }

  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }



  verifyOTP() {
    const registrationData = this.eventRegisterForm.value;
    const eventRegOTPData = this.eventRegOtpForm.value;
    console.log(registrationData);
    console.log(eventRegOTPData);
    this.dataLoaderService.verifyOTP(registrationData.mobileNumber, eventRegOTPData.otp).subscribe((res) => {
      this.toastrService.success(res.message)
    },
      error => {
        this.toastrService.error(error.message)
      });
  }

  get f() {
    return this.eventRegisterForm.controls;
  }

  getTotalRegisteredStudentsForEvent() {
    this.dataLoaderService.getTotalRegisteredStudentsForEvent(this.event.eventId).subscribe(
      response => {
        this.totalRegisteredStudents = response;
      },
      error => {
        console.error('Error fetching total registered students', error);
      }
    );
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // This line ensures only numeric characters are allowed
  }

}

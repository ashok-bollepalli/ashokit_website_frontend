import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddTrainerEnquiriesDTO } from 'src/app/dto/AddTrainerEnquiriesDTO';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EnquiriesService } from 'src/app/services/enquiries.service';
import { TrainerEnquiriesService } from 'src/app/trainer-enquiries.service';

@Component({
  selector: 'app-add-trainer-enquiries',
  templateUrl: './add-trainer-enquiries.component.html',
  styleUrls: ['./add-trainer-enquiries.component.scss']
})
export class AddTrainerEnquiriesComponent {

  public addTrainerEnquiries!: AddTrainerEnquiriesDTO;
  public countryCodes: CountryCodeDTO[] = [];
  addTrainerEnquiriesForm: FormGroup = this.formBuilder.group({});

  constructor(private router: Router,
    private trainerEnquiriesService: TrainerEnquiriesService,
    private formBuilder: FormBuilder,
    private dataService: DataServiceService,
    private toasterService: ToastrService,
    private enquiryServive: EnquiryService
  ) { }
  ngOnInit(): void {
    this.trainerEnquiriesService.getAllTrainerEnquiries().subscribe(res => {
      this.addTrainerEnquiries = res.data[0];
    })
    this.addTrainerEnquiriesForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      message: ['', Validators.required],
      skills: ['', Validators.required],
    });
    this.getAllCountryCodes();
  }
  onSubmit(): void {
    if (this.addTrainerEnquiriesForm.valid) {
      const addTrainerEnquiriesData = this.addTrainerEnquiriesForm.value;
      this.trainerEnquiriesService.addTrainerEnquiries(addTrainerEnquiriesData).subscribe(res => {
        this.addTrainerEnquiries = res.data[0];
        this.addTrainerEnquiriesForm.reset();
        this.toasterService.success('Success!', 'Trainer Enquiry Submitted Successfully');

      }, error => {
        this.toasterService.error('Error!', 'Failed to Submit Trainer Enquiry');
      });
    } else {
      this.toasterService.warning('Warning!', 'Please Fill in All Required Fields');
    }
  }
  getAllCountryCodes() {
    this.enquiryServive.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }
}





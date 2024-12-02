import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCompanyEnquiriesService } from 'src/app/add-company-enquiries.service';
import { AddCompanyEnquiriesDTO } from 'src/app/dto/AddCompanyEnquiriesDTO';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-add-company-enquiries',
  templateUrl: './add-company-enquiries.component.html',
  styleUrls: ['./add-company-enquiries.component.scss']
})
export class AddCompanyEnquiriesComponent implements OnInit {

  public addCompanyEnquiries!: AddCompanyEnquiriesDTO;
  public countryCodes: CountryCodeDTO[] = [];
  addCompanyEnquiriesForm: FormGroup = this.formBuilder.group({});

  constructor(private router: Router,
    private addCompanyEnquiriesService: AddCompanyEnquiriesService,
    private formBuilder: FormBuilder,
    private dataService: DataServiceService,
    private toasterService: ToastrService,
    private enquiryServive: EnquiryService
  ) { }
  ngOnInit(): void {
    this.addCompanyEnquiriesService.getAllCompanyEnquiries().subscribe(res => {
      this.addCompanyEnquiries = res.data[0];
    })
    this.addCompanyEnquiriesForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      countryCode: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.getAllCountryCodes();
  }
  onSubmit(): void {
    if (this.addCompanyEnquiriesForm.valid) {
      const addCompanyEnquiriesData = this.addCompanyEnquiriesForm.value;
      this.addCompanyEnquiriesService.addCompanyEnquiries(addCompanyEnquiriesData).subscribe(res => {
        this.addCompanyEnquiries = res.data[0];
        this.addCompanyEnquiriesForm.reset();
        this.toasterService.success('Success!', 'Company  Enquiry Submitted Successfully');

      }, error => {
        this.toasterService.error('Error!', 'Failed to Submit Company Enquiry');
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









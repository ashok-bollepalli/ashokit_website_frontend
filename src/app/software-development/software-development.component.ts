import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';

@Component({
  selector: 'app-software-development',
  templateUrl: './software-development.component.html',
  styleUrls: ['./software-development.component.scss']
})
export class SoftwareDevelopmentComponent implements OnInit {
  contactUsForm: FormGroup = this.formBuilder.group({});
  public submitted = false;
  public countryCodes: CountryCodeDTO[]=[];
  public countryCode: any =0;
  constructor(
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllCountryCodes();
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId:  ['', Validators.required],
      phoneNo: ['', Validators.required],
      message: ['', Validators.required],   
      countryCode:[this.countryCode, Validators.required]
    })
  }
  get f() {
    return this.contactUsForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.contactUsForm.valid) {
      const contactUsData = this.contactUsForm.value;
      this.dataLoaderService.addContactUs(contactUsData).subscribe
        (res => {
          this.contactUsForm.reset();
          this.toastrService.success('Thank you for contacting us, our team will get in touch with you shortly');
        },
          error => {

          }
        )
    }
  }
  getAllCountryCodes(){
    this.dataLoaderService.getAllCountryCodes().subscribe(res =>{
      this.countryCodes = res.data;
    },
    (error) => {
      console.error('Error fetching country codes :', error);
    }
  )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralSettingsDTO } from '../dto/GeneralSettingsDTO';
import { CountryCodeDTO } from '../dto/CountryCodeDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public generalSetting: any = {};
  public countryCodes: CountryCodeDTO[] = [];
  public generalSettings:GeneralSettingsDTO[] = [];
  contactUsForm: FormGroup = this.formBuilder.group({});
  public countryCode: any =0;
  public submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private toastrService: ToastrService,
    private meta: Meta, private titleService: Title
  ) { }

  ngOnInit(): void {
    this.setMetaTags();
    this.getAllGeneralSettings();
    this.getAllCountryCodes();
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId:  ['', Validators.required],
      phoneNo:  ['', Validators.required],
      countryCode:  ['91', Validators.required],
      message:  ['', Validators.required]
    });
   
  }


  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Contact Us | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Contact Us Desc' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Contact Us Keywords' });
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
          this.submitted = false; // Reset the submitted state after successful submission
        },
          error => {

          }
        )
    }
  }

  getAllGeneralSettings() {
    this.dataLoaderService.getAllGeneralSettings().subscribe((res: any) => {
      this.generalSettings = res.data;
      this.generalSetting = res.data[0];
    },
      (error) => {
        console.log('Error fetching generalSettings:', error);
      }
    )
  }
  getAllCountryCodes() {
    this.dataLoaderService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    },
    (error) => {
      console.log('Error fetching country codes:', error);
    }
  )
}

}


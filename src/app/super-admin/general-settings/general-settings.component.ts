import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralSettingsDTO } from 'src/app/dto/GeneralSettingsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  public generalSetting: GeneralSettingsDTO = {
    id: 0,
    logoDark: '',
    favIcon: '',
    footer: '',
    smtpUser: '',
    phoneNumber:'' , 
    companyName: '',
    gst:0 , 
    logoImageDark: '',
    favIconImage: '',
    address: '',
    email: '',
    colorCode: ''
  };
  public generalSettings: GeneralSettingsDTO[] = [];
  logoDark: File | null = null;
  favIcon: File | null = null;


  constructor(private router: Router,
    private generalSettingsService: GeneralSettingsService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private dataService: DataServiceService,
    private toastrService: ToastrService
  ) { }
  
  ngOnInit(): void {

    this.generalSettingsService.getAllGeneralSettings().subscribe(res => {
      if(res && res.data && res.data.length > 0) {
      this.generalSetting = res.data[0];
      }
    })

  }

  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }




  onSubmit(): void {
    if (this.logoDark && this.favIcon) {
      this.generalSettingsService.addGeneralSettings(this.generalSetting, this.logoDark, this.favIcon).subscribe(
        (res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.generalSetting = res.data[0];
          } else {
            console.warn('Unexpected response structure', res);
          }
        },
        (err: any) => {
          console.error('Error adding payment settings', err);
        }
      );
    } else {
      console.error('No image file provided');
    }
  }



  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'logoDark') {
        this.logoDark = files[0];
      }
    }
  }

  onFileChanges(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'favIcon') {
        this.favIcon = files[0];
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SmptSettingsDTO } from 'src/app/dto/SmptSettingsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SmptSettingsService } from 'src/app/services/smpt-settings.service';

@Component({
  selector: 'app-smpt-settings',
  templateUrl: './smpt-settings.component.html',
  styleUrls: ['./smpt-settings.component.scss']
})
export class SmptSettingsComponent implements OnInit {

  public smptSetting: SmptSettingsDTO = {
    id: 0,
    protocol: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: ''
  };

  constructor(
    private router: Router,
    private smptSettingsService: SmptSettingsService,
    private formBuilder: FormBuilder,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.smptSettingsService.getSmptSettings().subscribe(
      res => {
        if (res && res.data && res.data.length > 0) {
          this.smptSetting = res.data[0];
        } else {
          console.error('Unexpected response structure', res);
        }
      },
      error => {
        console.error('Error fetching SMTP settings', error);
      }
    );
  }

  onSubmit(): void {
    this.smptSettingsService.addSmptSettings(this.smptSetting).subscribe(
      res => {
        if (res && res.data && res.data.length > 0) {
          this.smptSetting = res.data[0];
        } else {
          console.error('Unexpected response structure', res);
        }
      },
      error => {
        console.error('Error updating SMTP settings', error);
      }
    );
  }

}

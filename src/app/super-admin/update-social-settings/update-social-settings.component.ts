import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialSettingsDTO } from 'src/app/dto/SocialSettingsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SocialSettingsService } from 'src/app/services/social-settings.service';

@Component({
  selector: 'app-update-social-settings',
  templateUrl: './update-social-settings.component.html',
  styleUrls: ['./update-social-settings.component.scss']
})
export class UpdateSocialSettingsComponent implements OnInit {
  socialSetting!: SocialSettingsDTO;

  name: string ='';
  constructor(
    private socialSettingsService: SocialSettingsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService
    
  ) {}
  ngOnInit(): void {

  this.socialSetting = this.dataService.socialSettingsData;

  }

  onSubmit(): void {
    if(this.socialSetting) {
      this.socialSettingsService.updateSocialSettings(this.socialSetting).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/super-admin/social-settings']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {
     
    }
  }

  updateCourseSubModule() {
    this.router.navigate(['/super-admin/social-settings']);
  }

}

import { Component } from '@angular/core';
import { SocialSettingsDTO } from '../dto/SocialSettingsDTO';
import { DataLoaderService } from '../services/data-loader.service';
import { GeneralSettingsDTO } from '../dto/GeneralSettingsDTO';

@Component({
  selector: 'app-starting-header',
  templateUrl: './starting-header.component.html',
  styleUrls: ['./starting-header.component.scss']
})
export class StartingHeaderComponent {

  socialSettings: SocialSettingsDTO[] = [];
  generalSettings!: GeneralSettingsDTO;  

  constructor(
    private dataLoaderService: DataLoaderService

  ) { }
  ngOnInit(): void {
    //this.getAllSocialSettings();
    this.getAllGeneralSettings();
  }
  getAllSocialSettings(): void {
    this.dataLoaderService.getAllSocialSettings().subscribe(
      res => {
        if (res.data && res.data.length > 0) {
          this.socialSettings = res.data;
        } else {
          //this.setDefaultSocialSettings();
        }
      },
      (error) => {
        console.log('Error fetching getAllSocialSettings: ', error);
        //this.setDefaultSocialSettings();
      }
    );
  }

  getAllGeneralSettings(): void {
    this.dataLoaderService.getAllGeneralSettings().subscribe(
      res => {
        if (res.data[0]) {
          this.generalSettings = res.data[0];
        } else {
        }
      },
      (error) => {
        console.log('Error fetching getAllGeneralSettings: ', error);        
      }
    );
  }
}

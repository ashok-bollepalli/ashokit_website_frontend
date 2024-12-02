import { Component } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { GeneralSettingsDTO } from '../dto/GeneralSettingsDTO';
import { DataSharingService } from '../services/sharing/data-sharing.service';
import { Router } from '@angular/router';
import { SocialSettingsDTO } from '../dto/SocialSettingsDTO';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
[x: string]: any;

socialSettings: SocialSettingsDTO[] = [];

  generalSettings: GeneralSettingsDTO ={
    id: 0,
    logoDark: '',
    favIcon: '',
    footer: 'Ashok IT is a leading Indian IT training institute preparing tech-aspirants for flourishing careers in this challenging and competitive domain since 2020.',
    smtpUser: '',
    phoneNumber: "9985396677",
    companyName: 'Ashok IT',
    gst: 0,
    logoImageDark: 'logo',
    favIconImage:'',
    address: 'H.No - 7-1-413/2, Beside Sonabhai Temple, Ameerpet, Hyderabad - 500016',
    email: 'info@ashokitech.com',
    colorCode: '#ff0000',
  };

  public isChatBoxEnable: boolean = false;
  constructor(
    private dataLoaderService: DataLoaderService,
    private dataSharingService: DataSharingService,
    private router: Router
    
  ) {}
  ngOnInit(): void {
    this.getAllGeneralSettings();
    this.getAllSocialSettings();
  }

  
  logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';

  handleError() {
    this.logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';
  }

  messageUs() {
    this.isChatBoxEnable = true;
  }

  closePopup() {
    console.log('Closing chatbox...');
    this.isChatBoxEnable = false;
    console.log('Chatbox closed:', this.isChatBoxEnable);
  }
  
  getAllGeneralSettings(): void {
    this.dataLoaderService.getAllGeneralSettings().subscribe(
      res => {
        if( res.data[0]){
        this.generalSettings = res.data[0];
        }
      },
      error => {
        console.error('Error fetching social settings:', error);
      }
    );
  }
  scrollTo(identification: string){
    this.dataSharingService.scrollTo(identification)
  }
  
  Placements(){
    this.router.navigate(['/placements']);
  }

  trainingSchedules(){
    this.router.navigate(['/training-schedule']);
  }

  setDefaultSocialSettings() {
    this.socialSettings = [{
      id: 1,
      name: 'Facebook',
      code: 'Facebook',
      link: 'Facebook',
      status: 'Active'
    },

    {
      id: 2,
      name: 'Whatsapp',
      code: 'Whatsapp',
      link: 'Whatsapp',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Instagram',
      code: 'Instagram',
      link: 'Instagram',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Youtube',
      code: 'Youtube',
      link: 'Youtube',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Twitter',
      code: 'Twitter',
      link: 'Twitter',
      status: 'Active'
    }
  ];
  }
  getAllSocialSettings(): void {
    this.dataLoaderService.getAllSocialSettings().subscribe(
      res => {
        if (res.data && res.data.length > 0) {
          this.socialSettings = res.data;
        } else {
          this.setDefaultSocialSettings();
        }
      },
      (error) => {
        console.log('Error fetching clients: ', error);
        this.setDefaultSocialSettings();
      }
    );
  }
  
}

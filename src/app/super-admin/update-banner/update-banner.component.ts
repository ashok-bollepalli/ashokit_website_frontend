import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannerDTO } from 'src/app/dto/BannerDTO';
import { BannerService } from 'src/app/services/banner.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.scss']
})
export class UpdateBannerComponent {
  banner!:BannerDTO;
  title: string = '';
 
  coverImageFile!: File ;
  
constructor( private router: Router,
  private dataService: DataServiceService,
  private activatedRoute: ActivatedRoute,
  private bannerService:BannerService,
  private toaster: ToastrService,
  private userStorageService: UserStorageService

  
  ){ }

  ngOnInit() {


    this.banner = this.dataService.bannerData;
  }
  
  onSubmit() {
    if (this.banner) {
      this.bannerService.updateBanner(this.banner, this.coverImageFile).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/banner']);
          } else {
            this.router.navigate(['/admin/banner']);
          }
        });
    }
  }
  
  editBanner() {
    this.router.navigate(['super-admin/banner'])
  }

  
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannerPromotionDTO } from 'src/app/dto/BannerPromotionDTO';
import { BannerPromotionService } from 'src/app/services/banner-promotion.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-edit-banner-promotion',
  templateUrl: './edit-banner-promotion.component.html',
  styleUrls: ['./edit-banner-promotion.component.scss']
})
export class EditBannerPromotionComponent implements OnInit {
  // public bannerPromotions: BannerPromotionDTO[] = [];
  bannerPromotion!: BannerPromotionDTO;
  title: string = '';
  displayBanner: string = '';
  coverImage: string = '';
  coverImageFile!: File;

  constructor(
    private bannerPromotionService: BannerPromotionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService

  ) { }

  ngOnInit(): void {
    this.bannerPromotion = this.dataService.bannnerPromtionData;
  }

  onSubmit(): void {
    this.bannerPromotionService.upDateBannerPromotions(this.bannerPromotion, this.coverImageFile).subscribe(
      (res: any) => {
        this.toaster.success('Data Updated Successfully');
        if (this.userStorageService.getRole() == 'SUPERADMIN') {
          this.router.navigate(['/super-admin/banner-promotion']);
        } else {
          this.router.navigate(['/admin/banner-promotion']);
        }
      });
  }

  updateBanner() {
    this.router.navigate(['/super-admin/banner-promotion']);
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

}

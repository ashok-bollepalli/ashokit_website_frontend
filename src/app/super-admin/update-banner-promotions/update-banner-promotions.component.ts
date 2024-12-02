import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerPromotionDTO } from 'src/app/dto/BannerPromotionDTO';
import { BannerPromotionService } from 'src/app/services/banner-promotion.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-update-banner-promotions',
  templateUrl: './update-banner-promotions.component.html',
  styleUrls: ['./update-banner-promotions.component.scss']
})
export class UpdateBannerPromotionsComponent implements OnInit {
  bannerPromoton!:BannerPromotionDTO;
  title: string = '';
  coverImageFile!: File;


  constructor(private router:Router,
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private bannerPromotionService:BannerPromotionService
     ){}

     ngOnInit() {
      this.bannerPromoton = this.dataService.bannnerPromtionData
    }
    edit(){
      this.router.navigate(['super-admin/bannerPromotion'])
     }

     onSubmit() {
      if (this.bannerPromoton) {
        this.bannerPromotionService.upDateBannerPromotions(this.bannerPromoton, this.coverImageFile).subscribe(
          (res: any) => {
            this.router.navigate(['super-admin/bannerPromotion'])
          },
          (error: any) => {
            console.error("Error:", error);
          }
        );
      }
    }

    onFileChange(event: any) {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
        this.coverImageFile = files[0];
      }
    }
   
}



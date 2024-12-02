import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannerPromotionDTO } from 'src/app/dto/BannerPromotionDTO';
import { BannerPromotionService } from 'src/app/services/banner-promotion.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-bannerpromotion',
  templateUrl: './add-bannerpromotion.component.html',
  styleUrls: ['./add-bannerpromotion.component.scss']
})
export class AddBannerpromotionComponent implements OnInit {
  bannerPromotionForm: FormGroup = this.formBuilder.group({});
  coverImageFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private bannerPromotionService: BannerPromotionService,
    private router: Router,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }
  ngOnInit(): void {
    this.bannerPromotionForm = this.formBuilder.group({
      url: ['', Validators.required],
      image: ['', Validators.required],
      displayBannerType: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.bannerPromotionForm.valid && this.coverImageFile) {
      const bannerPromotion = this.bannerPromotionForm.value;
      this.bannerPromotionService.addBannerPromotions(bannerPromotion, this.coverImageFile).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        if (this.userStorageService.getRole() == 'SUPERADMIN') {
          this.router.navigate(['/super-admin/banner-promotion']);
        } else {
          this.router.navigate(['/admin/banner-promotion']);
        }
      });
    }
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

}

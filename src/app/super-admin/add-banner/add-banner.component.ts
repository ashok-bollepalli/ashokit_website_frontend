import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from 'src/app/services/banner.service';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

  bannerForm: FormGroup = this.formBuilder.group({});
  coverImageFile: File | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private router: Router,
    private fileStorageService: FileStorageService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      coverImage: ['', Validators.required],
    });

  }

  onSubmit(): void {
    if (this.bannerForm.valid && this.coverImageFile) {
      const bannerData = this.bannerForm.value;
      this.bannerService.addBanner(bannerData, this.coverImageFile).subscribe(
        res => {
          this.toaster.success('Data Added Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/banner']);
          } else {
            this.router.navigate(['/admin/banner']);
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








import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BannerDTO } from 'src/app/dto/BannerDTO';
import { BannerService } from 'src/app/services/banner.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public filteredBanners:BannerDTO[] =[];
 public banners: BannerDTO[] = [];
  public title:string ='';
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private bannerService: BannerService,
    private router: Router,
    private dataService: DataServiceService,
    private fileStorageService: FileStorageService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.getAllBanners();
  }


  getAllBanners() {
    this.bannerService.getAllBanners().subscribe(
      res => {
        this.filteredBanners = res.data;
        this.banners = res.data;
        this.filter();
      },
      error => {

      }
    )
  }
  filter() {
    this.filteredBanners = this.banners.filter(
      (banner: BannerDTO) => {
        return banner.title
          .toLowerCase()
          .trim()
          .includes(this.title.toLowerCase().trim());
      }

    );
    this.calculateTotalPages();
    
  }
 
  addBanner() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-banner']);
    } else {
      this.router.navigate(['/admin/add-banner']);
    }
  }
  calculateTotalPages() {
    if (this.banners) {
      this.totalItems = this.banners.length;
    } else {
      this.totalItems = 0;
    }
  }
  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }
  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
  editBanner(banner:BannerDTO){
    this.dataService.bannerData = banner;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
    this.router.navigate(['/super-admin/update-banner']);
  } else {
    this.router.navigate(['/admin/update-banner']);
  }
}

  
  updateBannerStatus(bannerId: number, status: number) {
    console.log('s', status)
    if (status === 1) {
      status = 0;
    } else {
      status = 1;
    }
    this.bannerService.updateBannerStatus(bannerId, status).subscribe((res) => {
      this.getAllBanners();
      this.filter();
    });
  }

  deleteBanner(bannerId: number, coverImageName: string) {
    this.bannerService.deleteBanner(bannerId, coverImageName).subscribe((res) => {
      this.getAllBanners();
      this.filter();
    });
  }


}

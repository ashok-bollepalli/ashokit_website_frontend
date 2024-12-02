import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BannerPromotionDTO } from 'src/app/dto/BannerPromotionDTO';
import { BannerPromotionService } from 'src/app/services/banner-promotion.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-banner-promotion',
  templateUrl: './banner-promotion.component.html',
  styleUrls: ['./banner-promotion.component.scss']
})
export class BannerPromotionComponent implements OnInit {

  public bannerPromotions: BannerPromotionDTO[] = [];
  public filteredBanners: BannerPromotionDTO[] = [];
  public url: string = '';
  public pageSize: number = 5; 
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private router: Router,
    private bannerPromotionService: BannerPromotionService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService

  ) { }


  ngOnInit() {
    this.getAllBannerPromotion();

  }

  filter() {
    this.filteredBanners = this.bannerPromotions.filter(
      (banner: BannerPromotionDTO) => {
        return banner.url
          .toLowerCase().trim()
          .includes(this.url.trim().toLowerCase().trim());
      }

    );

  }


  addBannerPromotion() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-bannerpromotion']);
    } else {
      this.router.navigate(['/admin/add-banner-promotion']);
    }
  }

  getAllBannerPromotion() {
    this.bannerPromotionService.getAllBannerPromotion().subscribe(
      res => {
        this.bannerPromotions = res.data;
       this.filter() 
       this.filteredBanners = res.data;

      }, error => {

        console.error('Error fetching BannerPromotion:', error);
      });
  }



  updateBannerPromotionStatus(id: number, status: number) {
    console.log('s', status)
    if (status === 1) {
      status = 0;
    } else {
      status = 1;
    }
    this.bannerPromotionService.updateBannerPromotionStatus(id, status).subscribe((res) => {
      this.getAllBannerPromotion();
      this.filter();
    });
  }

  deleteBannerPromotion(id: number) {
    this.bannerPromotionService.deleteBannerPromotion(id).subscribe((res) => {
      this.getAllBannerPromotion();
      this.filter();
    });
  }
  edit(bannerPromotion: BannerPromotionDTO) {
    this.dataService.bannnerPromtionData = bannerPromotion;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
    this.router.navigate(['/super-admin/edit-banner-promotions']);
  } else {
    this.router.navigate(['/admin/edit-banner-promotions']);
  }
}

  calculateTotalPages() {
    if (this.bannerPromotions) {
      this.totalItems = this.bannerPromotions.length;
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

}
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSettingsDTO } from 'src/app/dto/SocialSettingsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SocialSettingsService } from 'src/app/services/social-settings.service';

@Component({
  selector: 'app-social-settings',
  templateUrl: './social-settings.component.html',
  styleUrls: ['./social-settings.component.scss']
})
export class SocialSettingsComponent implements OnInit {
 

  socialSettings: SocialSettingsDTO[] = [];
  public pageSize: number = 5; 
  public currentPage: number = 1;
  public name: string = '';
  filteredSocialSettings: SocialSettingsDTO[] =[];
  public totalItems: number = 0; 
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private socialSettingsService: SocialSettingsService,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.getAllSocialSettings();
  }

  
filter() {
         this.filteredSocialSettings = this.socialSettings.filter(
        (socialSettings: SocialSettingsDTO) => {
          return socialSettings.name
          .toLowerCase().trim()
          .includes(this.name.toLowerCase().trim());
        }
         )
         this.calculateTotalPages();
  }
  addSocialSettings(): void {
    this.router.navigate(['/super-admin/add-social-settings']);
  }

  getAllSocialSettings(): void {
    this.socialSettingsService.getAllSocialSettings().subscribe(
      res => {
        this.socialSettings = res.data;
        this.filteredSocialSettings = res.data;
        this.filter();

      },
      error => {
        console.error('Error fetching social settings:', error);
      }
    );
  }
  calculateTotalPages() {
    if (this.filteredSocialSettings) {
      this.totalItems = this.filteredSocialSettings.length;
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

  updateSocialSettings(socialSetting: SocialSettingsDTO): void {
    this.dataService.socialSettingsData = socialSetting;
    this.router.navigate(['/super-admin/update-social-settings']);
  }
  updateSocialSettingsStatus(id: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    this.socialSettingsService.updateSocialSettingsStatus(id, status).subscribe((res) => {
      this.getAllSocialSettings();
      this.filter();
    });
  }
  
 
}

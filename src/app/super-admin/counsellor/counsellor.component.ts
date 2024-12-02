import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.scss']
})
export class CounsellorComponent implements OnInit {

  public counsellors: CounsellorDTO[] = [];
  public filteredCounsellors: CounsellorDTO[] = [];
  public counsellorId: number = 0;
  public counsellorName: string = '';

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private router: Router,
    private counsellorService: CounsellorService,
    private userStorageService: UserStorageService,
    private dataServiceService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getAllCounsellorsWithStatus();
  }


  // getAllCounsellors() {
  //   this.counsellorService.getAllCounsellors().subscribe((res) => {
  //     this.counsellors = res.data;
  //     this.filter(); 
  //   });
  // }
  getAllCounsellorsWithStatus() {
    this.counsellorService.getAllCounsellorsWithStatus().subscribe((res) => {
      this.counsellors = res.data;
      this.filter();
    });
  }

  filter() {
    this.filteredCounsellors = this.counsellors.filter(
      (counsellor: CounsellorDTO) => {
        return counsellor.counsellorName
          .toLowerCase()
          .trim()
          .includes(this.counsellorName.toLowerCase().trim());
      }
    );
    this.calculateTotalPages();
  }

  addCounsellor() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-counsellor']);
    } else {
      this.router.navigate(['/admin/add-counsellor']);
    }
  }

  calculateTotalPages() {
    if (this.filteredCounsellors) {
      this.totalItems = this.filteredCounsellors.length;
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

  modifyCounsellorStatus(counsellorId: number, activeStatus: string) {
    if (activeStatus === 'Active') {
      activeStatus = 'In_Active';
    } else {
      activeStatus = 'Active';
    }
    this.counsellorService.modifyCounsellorStatus(counsellorId, activeStatus).subscribe((res) => {
      this.getAllCounsellorsWithStatus();
      this.filter();
    });
  }

  editCounsellor(counsellor: CounsellorDTO) {
    this.dataServiceService.counsellorData = counsellor;
    this.router.navigate(['/super-admin/edit-counsellor']);
  }

}

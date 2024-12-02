import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePopUpDTO } from 'src/app/dto/CoursePopUpDTO';
import { CoursePopUpService } from 'src/app/services/coursepopup.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
@Component({
  selector: 'app-course-popup',
  templateUrl: './course-popup.component.html',
  styleUrls: ['./course-popup.component.scss'],
})
export class CoursePopUpComponent implements OnInit {
  public coursePopUps: CoursePopUpDTO[] = [];
  public filteredCoursePopUps: CoursePopUpDTO[] = [];
  public courseName: string = "";
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private coursePopUpService: CoursePopUpService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.getAllCoursePopUp();
  }

  filter() {
    this.filteredCoursePopUps = this.coursePopUps.filter(
      (coursePopUp: CoursePopUpDTO) => {
        return coursePopUp.courseName
          .toLowerCase()
          .trim()
          .includes(this.courseName.toLowerCase().trim());
      }
    );
    this.calculateTotalPages();
  }

  getAllCoursePopUp() {
    this.coursePopUpService.getAllCoursePopUp().subscribe(
      (res) => {
        this.coursePopUps = res.data;
        this.filteredCoursePopUps = res.data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addPopup() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-popup']);
    } else {
      this.router.navigate(['/admin/add-popup']);
    }
  }

  updatePopup(coursePopup: CoursePopUpDTO) {
    this.dataService.coursePopUpData = coursePopup;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
    this.router.navigate(['/super-admin/update-popup']);
  } else {
    this.router.navigate(['/admin/update-popup']);
  }
}

  updateCoursePopUpStatus(id: number, status: string) {
    console.log('s', status)
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = "Active";
    }
    this.coursePopUpService.updateCoursePopUpStatus(id, status).subscribe((res) => {
      this.getAllCoursePopUp();
      this.filter();
    });
  }

  deleteCoursePopUp(id: number) {
    this.coursePopUpService.deleteCoursePopUp(id).subscribe((res) => {
      this.getAllCoursePopUp();
      this.filter();
    });
  }
  calculateTotalPages() {
    if (this.coursePopUps) {
      this.totalItems = this.coursePopUps.length;
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

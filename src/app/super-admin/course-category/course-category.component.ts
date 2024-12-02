import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss'],
})
export class CourseCategoryComponent implements OnInit {
  courseCategories: CourseCategoryDTO[] = [];
  filteredCourseCategories: CourseCategoryDTO[] = [];
  categoryName: string = '';

  public pageSize: number = 15;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private courseCategoryService: CourseCategoryService,
    private dataLoaderService: DataLoaderService,
    private userStorageService: UserStorageService,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getAllCoursesWithStatus();
  }

  // getCourseCategories() {
  //   this.courseCategoryService.getCourseCategories().subscribe((res) => {
  //     this.courseCategories = res.data;
  //     this.filter();
  //   });
  // }
  getAllCoursesWithStatus() {
    this.courseCategoryService.getAllCourseCategoriesWithStatus().subscribe((res) => {
      this.courseCategories = res.data;
      this.filter();
    });
  }

  filter() {
    this.filteredCourseCategories = this.courseCategories.filter(
      (categoryDTO: CourseCategoryDTO) => {
        return categoryDTO.courseCategoryName
          .toLowerCase()
          .trim()
          .includes(this.categoryName.toLowerCase().trim());
      }
    );
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    if (this.filteredCourseCategories) {
      this.totalItems = this.filteredCourseCategories.length;
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

  addCourseCategory() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-course-category']);
    } else {
      this.router.navigate(['/admin/add-course-category']);
    }
  }

  updateCourseCategoryStatus(categoryId: number, status: string) {
    if (status === 'Active') {
      status = 'In_Active';
    } else {
      status = 'Active';
    }
    this.courseCategoryService.updateCategoryStatus(categoryId, status).subscribe((res) => {
      this.getAllCoursesWithStatus();
      this.filter();
    });
  }

  editCourseCategory(courseCategory: CourseCategoryDTO) {
    this.dataService.courseCategoryData = courseCategory;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/edit-course-category']);
    } else {
      this.router.navigate(['/admin/edit-course-category']);
    }
  }
}

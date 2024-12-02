import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseServiceService } from '../../services/course-service.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})

export class ViewCoursesComponent implements OnInit {
  public courses: CourseDTO[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public filteredCourses: CourseDTO[] = [];
  public courseCategory: string = '';
  public courseCategoryId: number = 0;
  public courseName: string = '';

  public pageSize: number = 25;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private router: Router,
    private courseService: CourseServiceService,
    private courseCategoryService: CourseCategoryService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) { }

  filter() {
    this.filteredCourses = this.courses.filter((course: CourseDTO) => {
      const matchedCourseCategoryId = course.courseCategoryId == this.courseCategoryId;
      const matchedCourseName = course.courseName.toLowerCase().trim() == this.courseName.toLowerCase().trim();
      return matchedCourseCategoryId || matchedCourseName;

    });
    this.calculateTotalPages();
  }

  findMatchedRecord(categoryId: number): CourseCategoryDTO | undefined {
    return this.courseCategories.find((courseCategoryDTO: CourseCategoryDTO) => {
      if (courseCategoryDTO.courseCategoryId == categoryId) {
        this.courseCategory = courseCategoryDTO.courseCategoryName;
      }
      return courseCategoryDTO.courseCategoryId === categoryId;
    });
  }

  ngOnInit() {
    this.getAllCoursesWithStatus();
    this.getCourseCategories();
  }

  // getAllCourses() {
  //   this.courseService.getAllCourses().subscribe(
  //     res => {
  //       this.courses = res.data;
  //       this.filteredCourses = res.data;
  //     },
  //     error => {
  //     }
  //   );
  // }
  getAllCoursesWithStatus() {
    this.courseService.getAllCoursesWithStatus().subscribe(
      res => {
        this.courses = res.data;
        this.filteredCourses = res.data;
      },
      error => {
      }
    );
  }

  addCourse() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-courses']);
    } else {
      this.router.navigate(['/admin/add-courses']);
    }
  }

  getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
      },
      error => {

      }
    );
  }


  calculateTotalPages() {
    if (this.filteredCourses) {
      this.totalItems = this.filteredCourses.length;
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

  updateCourseStatus(courseId: number, status: string) {
    if (status === 'Active') {
      status = 'In_Active';
    } else {
      status = 'Active';
    }
    this.courseService.updateCourseStatus(courseId, status).subscribe((res) => {
      this.getAllCoursesWithStatus();
      this.filter();
    });
  }

  updateCourseTrending(courseId: number, trending: string) {
    if (trending === 'Active') {
      trending = 'In_Active';
    } else {
      trending = 'Active';
    }
    this.courseService.updateCategoryTrending(courseId, trending).subscribe((res) => {
      this.getAllCoursesWithStatus();
      this.filter();
    });
  }
  updateCourse(course: CourseDTO) {
    this.dataService.courseData = course;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-course']);
    } else {
      this.router.navigate(['/admin/update-course']);
    }
  }
  getCourseCategoryName(courseCategoryId: number): string {
    const foundCourseCategory = this.courseCategories.find(courseCategory => courseCategory.courseCategoryId === courseCategoryId);
    return foundCourseCategory ? foundCourseCategory.courseCategoryName : 'Unknown';
  }
}

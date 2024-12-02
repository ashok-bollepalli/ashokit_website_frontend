import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { SubModuleDTO } from 'src/app/dto/SubModuleDTO';
import { ModuleDTO } from 'src/app/dto/ModuleDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-sub-modules',
  templateUrl: './sub-modules.component.html',
  styleUrls: ['./sub-modules.component.scss']
})
export class SubModulesComponent implements OnInit {
  public subModules: SubModuleDTO[] = [];
  public courses: CourseDTO[] = [];
  public selectedCourses: any[] = [];
  public selectedModules: any[] = [];
  public courseCategories: CourseCategoryDTO[] = [];
  public modules: ModuleDTO[] = [];
  public moduleId: number = 1;
  public courseId: number = 1;
  public subModuleName: string = '';
  public courseCategoryId: any;

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public filteredSubModules: SubModuleDTO[] = [];


  constructor(
    private router: Router,
    private courseService: CourseServiceService,
    private courseCategoryService: CourseCategoryService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.getCourseCategories();
    this.getAllCourseModules();
    this.getAllSubModules();
    this.selectedCourses = this.courses;
    this.selectedModules = this.modules;
  }

  filter() {
    this.filteredSubModules = this.subModules.filter((subModule: SubModuleDTO) => {
      return subModule.courseCategoryId == this.courseCategoryId && subModule.courseId == this.courseId && subModule.moduleId == this.moduleId;

    });
    this.calculateTotalPages();
  }

  addCourseSubModule() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-sub-module']);
    } else {
      this.router.navigate(['/admin/add-sub-module']);
    }
  }

  getAllSubModules() {
    this.courseService.getAllSubModules().subscribe(
      (res: any) => {
        this.subModules = res.data;
        this.filteredSubModules = res.data;
        // this.filter();
      },
      (error) => {

      }
    );
  }
  getAllCourseModules() {
    this.courseService.getAllCourseModules().subscribe(
      res => {
        this.modules = res.data;
        this.selectedModules = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
        this.selectedCourses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
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

  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }
  getModuleName(moduleId: number): string {
    const foundModule = this.modules.find(module => module.moduleId === moduleId);
    return foundModule ? foundModule.moduleName : 'Unknown';
  }
  calculateTotalPages() {
    if (this.filteredSubModules) {
      this.totalItems = this.filteredSubModules.length;
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
  updateCourseSubModule(subModule: SubModuleDTO) {
    this.dataService.subModuleData = subModule; // Set DTO in DataService
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-sub-module']);
    } else {
      this.router.navigate(['/admin/update-sub-module']);
    }
  }
  updateCourseSubModuleStatus(subModuleId: number, activeStatus: string) {
    if (activeStatus === 'Active') {
      activeStatus = 'Inactive';
    } else {
      activeStatus = 'Active';
    }
    this.courseService.updateCourseSubModuleStatus(subModuleId, activeStatus).subscribe((res) => {
      this.getAllSubModules();
      this.filter();
    });
  }

  findCourseByCategory(e: any) {
    this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
  }

  findModuleByCourse(obj: any) {
    this.selectedModules = this.modules.filter(data => data.courseId == obj.target.value);
  }

  getCourseCategoryName(courseCategoryId: number) {
    const foundCourseCategory = this.courseCategories.find(courseCategory => courseCategory.courseCategoryId === courseCategoryId);
    return foundCourseCategory ? foundCourseCategory.courseCategoryName : 'Unknown';
  }

}




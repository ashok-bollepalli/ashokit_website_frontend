import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { ModuleDTO } from 'src/app/dto/ModuleDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';


@Component({
  selector: 'app-view-modules',
  templateUrl: './view-modules.component.html',
  styleUrls: ['./view-modules.component.scss']
})
export class ViewModulesComponent implements OnInit {


  public courseCategories: CourseCategoryDTO[] = [];
  public courses: any[] = [];
  public selectedCourses: any[] = [];
  public filteredModules: ModuleDTO[] = [];
  public modules: ModuleDTO[] = [];
  public courseCategory: string = '';
  public courseCategoryId: any;
  public moduleId: number = 0;
  public courseId: number = 1;
  public moduleName: string = '';
  
  public pageSize: number = 10; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private router: Router,
    private courseService: CourseServiceService,
    private courseCategoryService: CourseCategoryService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService) { }

  ngOnInit() {
    this.getCourseCategories();
    this.getAllCourses();
    this.getAllCourseModules();
    this.selectedCourses = this.courses;
  }


  filter() {
    this.filteredModules = this.modules.filter((module: ModuleDTO) => {

    /*  const matchedCourseCategoryId = module.courseCategoryId == this.courseCategoryId;
      const matchedCourseId = module.courseId == this.courseId;
      const matchedModuleName = module.moduleName.toLowerCase().trim() == this.moduleName.toLowerCase().trim();*/

      return module.courseCategoryId == this.courseCategoryId &&  module.courseId == this.courseId;


     // return matchedCourseCategoryId || matchedCourseId || matchedModuleName;

    });
    this.calculateTotalPages();
  }



  getAllCourseModules() {
    this.courseService.getAllCourseModules().subscribe(
      res => {
        console.log(res.data);
        this.modules = res.data;
        this.filteredModules = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addviewmodule() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-view-module']);
    } else {
      this.router.navigate(['/admin/add-view-module']);
    }
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
        this.selectedCourses = res.data;
      },
      error => {
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
  updateModuleStatus(moduleId: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    this.courseService.updateModuleStatus(moduleId, status).subscribe((res) => {
      this.getAllCourseModules();
      this.filter();
    });
  }

  calculateTotalPages() {
    if (this.filteredModules) {
      this.totalItems = this.filteredModules.length;
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


  editModule(module: ModuleDTO) {
    this.dataService.moduleData = module;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-module']);
    } else {
      this.router.navigate(['/admin/update-module']);
    }
  }

  findCourseByCategory(e: any) {
    console.log('q', this.courses);
    this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
    console.log('p', this.selectedCourses);
  }

  getCourseCategoryName(courseCategoryId: number) {
    const foundCourseCategory = this.courseCategories.find(courseCategory => courseCategory.courseCategoryId === courseCategoryId);
    return foundCourseCategory ? foundCourseCategory.courseCategoryName : 'Unknown';
  }

}

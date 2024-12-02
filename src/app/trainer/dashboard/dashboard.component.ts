import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BatchDTO } from 'src/app/dto/BatchDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public scheduleBatches: ScheduleBatchDTO[] = [];
  public filteredScheduleBatches: ScheduleBatchDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainerId: number = 0;
  public courseName: string = '';
  public courseStatus: string = '';
 
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  
  public search: string = '';


  constructor(
    private router: Router,
    private batchesSchedule: BatchesScheduleService,
    private courseService: CourseServiceService,
    private userStorageService: UserStorageService,
  ) { }

  ngOnInit(): void {
    this.trainerId = this.userStorageService.getTrainer().trainerId;
    this.getScheduleBatchByTrainer(this.trainerId);
    this.getAllCourses();

  }



  getScheduleBatchByTrainer(trainerId: number): void {
    this.batchesSchedule.getScheduleBatchByTrainer(trainerId).subscribe(
      res => {
        this.scheduleBatches = res.data
        this.filteredScheduleBatches = res.data
      },
      error => { }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
      }
    );
  }
  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }


  Search() {
    this.filteredScheduleBatches = this.scheduleBatches.filter(
      (scheduleBatche: ScheduleBatchDTO) => {
        return scheduleBatche.batchCode.toLowerCase().trim().includes(this.search.toLowerCase().trim())
          && scheduleBatche.courseStatus.toLocaleLowerCase().trim().includes(this.courseStatus.toLowerCase().trim());
      }
    );
  }

  calculateTotalPages() {
    if (this.filteredScheduleBatches) {
      this.totalItems = this.filteredScheduleBatches.length;
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


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-new-batch',
  templateUrl: './new-batch.component.html',
  styleUrls: ['./new-batch.component.scss']
})
export class NewBatchComponent implements OnInit {
  filteredNewBatches: ScheduleBatchDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainerId: number = 0;
  public courseId: any;
  public courseStatus: string = '';
  public demoStatus: string = '';
  public scheduleName: string = '';

  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  public scheduleBatch: ScheduleBatchDTO = {
    id: 0,
    courseName: '',
    trainer: '',
    counsellor: '',
    scheduleName: '',
    coursePrice: 0,
    offerPrice: 0,
    scheduleType: '',
    image: '',
    batchCode: '',
    backupVideos: '',
    backupVideosFee: 0,
    batchTimings: '',
    meridianType: '',
    startDate: new Date(),
    endDate: new Date(),
    duration: 0,
    zoomId: '',
    whatsappLink: '',
    gitLink: '',
    zoomRegLink: '',
    teachableCourseId: '',
    labelName: '',
    courseStatus: '',
    demoStatus: '',
    courseCategoryId: 0,
    courseId: 0,
    trainerId: 0,
    counsellorId: 0,
    clsrmTrngAvailable: ''
  }

  constructor(private router: Router,
    private batchesScheduleService: BatchesScheduleService,
    private trainerService: TrainerService,
    private dataService: DataServiceService,
    private courseService: CourseServiceService) { }

  ngOnInit(): void {
    this.getAllScheduledBatches();

    this.getAllTrainers();
    this.courseService.getAllCourses().subscribe(res => {
      this.courses = res.data;
    },
      error => {
        console.log('error1', error)
      })

  }



  applyFilter() {
    this.batchesScheduleService.getAllScheduledBatchesWithFilter(this.scheduleBatch).subscribe(
      res => {
        this.filteredNewBatches = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
    this.calculateTotalPages();
  }



  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(
      res => {
        this.batches = res.data;
        this.filteredNewBatches = res.data;
        // this.filter(); 
      },

      error => {
        console.log('error1', error)
      }
    )
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }


  getTrainerName(trainerId: number): string {
    const foundTrainer = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundTrainer ? foundTrainer.trainerName : 'Unknown';
  }
  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId == courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }

  enrollCourse() {
    this.router.navigate(['/super-admin/enroll-course']);
  }
  updateBatch(scheduleBatch: ScheduleBatchDTO) {
    this.dataService.ScheduleBatchData = scheduleBatch;
    console.log(scheduleBatch);
    this.router.navigate(['/super-admin/update-schedule-batch']);
  }

  calculateTotalPages() {
    if (this.filteredNewBatches) {
      this.totalItems = this.filteredNewBatches.length;
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

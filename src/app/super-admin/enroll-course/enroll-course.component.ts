import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CourseCategoryDTO } from 'src/app/dto/CourseCategoryDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { TeachableCourseDTO } from 'src/app/dto/TeachableCourseDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainingModesDTO } from 'src/app/dto/TrainingModesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { TeachableService } from 'src/app/services/teachable.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.scss']
})
export class EnrollCourseComponent implements OnInit {
  trainer: TrainerDTO[] = [];
  courses: CourseDTO[] = [];
  courseCategories: CourseCategoryDTO[]=[];
  counsellors: CounsellorDTO[] = [];
  trainingModes: TrainingModesDTO[] = [];
  public selectedCourses: any[] = [];
  public teachableCourses: TeachableCourseDTO[] = [];
  public courseStatus:string ='In-Progress';
  public trainerId!: number;
  public counsellorId! : number;
  public courseId!: number;
  public id!: number;
  courseEnrollForm: FormGroup = this.formBuilder.group({});

  constructor(
    private router: Router,
    private batchesScheduleService: BatchesScheduleService,
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private counsellorService: CounsellorService,
    private teachableService: TeachableService,
    private courseCategoryService: CourseCategoryService,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.courseEnrollForm = this.formBuilder.group({
      courseId: ['', Validators.required],
      courseCategoryId:['', Validators.required],
      trainerId: ['', Validators.required],
      counsellorId: ['', Validators.required],
      batchCode: ['', Validators.required],
      scheduleName: ['', Validators.required],
      scheduleType: ['', Validators.required],
    //  coursePrice: ['', Validators.required],
    //  offerPrice: ['', Validators.required],
      backupVideos: ['', Validators.required],
      backupVideosFee: ['', Validators.required],
     // duration: ['', Validators.required],
      startDate: ['', Validators.required],
      meridianType: ['', Validators.required],
      batchTimings: ['', Validators.required],
      whatsappLink: ['', Validators.required],
      gitLink: ['', Validators.required],
      zoomId: ['', Validators.required],
      zoomRegLink: ['', Validators.required],
     clsrmTrngAvailable: ['', Validators.required],
     // demoStatus: ['', Validators.required],
      teachableCourseId: ['', Validators.required]
    });

    this.getAllCourses();
    this.getAllTrainers();
    this.getAllCounsellors();
    this.getAllCourseCategories();
    this.getAllTeachableCourses();
    this.getTrainingModes();
  }
  

  onSubmit() {
    if (this.courseEnrollForm.valid) {
      const ScheduleBatchData = this.courseEnrollForm.value;
      this.batchesScheduleService.addNewBatch(ScheduleBatchData).subscribe(
        (res: any) => {
          this.router.navigate(['/super-admin/new-batch']);
          this.toasterService.success('Batch added successfully');
        },
        error => {
          console.error('Error occurred while adding new batch:', error);
          this.toasterService.error('Failed to add batch');
        }
      );
    } else {
      console.error('Form is invalid');
      this.toasterService.error('Please fill in all required fields');
    }
  }



  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getTrainingModes() {
    this.dataLoaderService.getTrainingModes().subscribe(res => {
        this.trainingModes = res.data;
      },
      error => {
        console.error('Error fetching scheduleTypes:', error);
      }
    );
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainer = res.data;
      },
      error => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  getAllCounsellors() {
    this.counsellorService.getAllCounsellors().subscribe(
      res => {
        this.counsellors = res.data;
      },
      error => {
        console.error('Error fetching counsellors:', error);
      }
    );
  }

  getAllCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(
      res => {
        this.courseCategories = res.data;
      },
      error => {
        console.error('Error fetching course categories:', error);
      }
    );
  }

  findCourseByCategory(e: any) {
    this.selectedCourses = this.courses.filter(data => data.courseCategoryId == e.target.value);
  }

  getAllTeachableCourses() {
    this.teachableService.getAllTeachableCourses().subscribe(
      res => {
        this.teachableCourses = res.data;
      },
      error => {
        console.error('Error fetching teachable courses:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainerPaymentDTO } from 'src/app/dto/TrainerPaymentDTO';
import { ZoomRegisteredDTO } from 'src/app/dto/ZoomRegisteredDTO';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { StudentBulkUploadService } from 'src/app/services/student-bulk-upload.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-upload-zoom-report',
  templateUrl: './upload-zoom-report.component.html',
  styleUrls: ['./upload-zoom-report.component.scss']
})
export class UploadZoomReportComponent implements OnInit {

  zoomReportForm: FormGroup = this.formBuilder.group({});


  public filteredTrainerpayments: TrainerPaymentDTO[] = [];
  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public trainerId: any;
  public courseId: number = 1;
  status!: string;
  batches: ScheduleBatchDTO[] = [];
  public selectedBatches: any[] = [];
  public id: any;
  public courseStatus:string ='In-Progress';
  public fileToUpload: File | null = null;
 

  constructor(private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private addStudentEnrollmentService: AddStudentEnrollmentService,
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private router: Router,
    private toasterService: ToastrService,
    private studentBulkUploadService: StudentBulkUploadService,
    private batchesScheduleService: BatchesScheduleService) { }

  ngOnInit(): void {
    this.zoomReportForm = this.formBuilder.group({
      trainerId: ['', Validators.required],
      courseStatus: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.getAllTrainers();
    this.getAllCourses();
    this.getAllScheduledBatches();

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
  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  getTrainerName(trainerId: number): string {
    const foundCourse = this.trainers.find(trainer => trainer.trainerId == trainerId);
    return foundCourse ? foundCourse.trainerName : 'Unknown';
  }

  sanitizeAboutCourseInput(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  submitZoomReport(): void {
    if (this.zoomReportForm.valid) {
      const zoomReportData = this.zoomReportForm.value;
      console.log(zoomReportData)
      if (this.fileToUpload !== null) {
        this.studentBulkUploadService.submitZoomReport(zoomReportData.trainerId, zoomReportData.id , this.fileToUpload!)
          .subscribe(
            response => {
              this.zoomReportForm.reset();
              console.log('uploaded zoom report successful');
              this.toasterService.success("uploaded zoom report successfully");

            },
            error => {
              console.error('Error during uploading:', error);
              this.toasterService.error("Error during uploading zoom report");
            }
          );
      } else {
        console.error('No file selected');
        this.toasterService.error("No file selected");
      }
    }
  }


    handleFileInput(event: any): void {
      const files: FileList = event.target.files;
      if(files && files.length > 0) {
      this.fileToUpload = files.item(0);
    } else {
      this.fileToUpload = null;
    }
  }

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe(res => {
      this.batches = res.data;
    },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  findBatchByTrainer(e: any) {
    this.batches = this.batches.filter(data => data.trainerId == this.trainerId);
  }

  findBatchByCourseStatus(obj: any) {
    console.log('p', this.batches);
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId==this.trainerId);
    console.log('q', this.selectedBatches);
  }
   
}

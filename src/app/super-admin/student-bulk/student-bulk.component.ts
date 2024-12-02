
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { StudentBulkUploadService } from 'src/app/services/student-bulk-upload.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { ViewPaymentDTO } from 'src/app/dto/ViewPaymentDTO';


@Component({
  selector: 'app-student-bulk',
  templateUrl: './student-bulk.component.html',
  styleUrls: ['./student-bulk.component.scss']
})
export class StudentBulkComponent implements OnInit {

  zoomReportForm: FormGroup = this.formBuilder.group({});

  public courses: CourseDTO[] = [];
  public trainers: TrainerDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];

  public selectedBatches: any[] = [];

  public fileToUpload: File | null = null;

  public trainerId: any;
  public jobTitle: any;

  public jobLeads: any[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private studentBulkUploadService: StudentBulkUploadService,
    private batchesScheduleService: BatchesScheduleService,
    private toasterService: ToastrService
  ) { }


  ngOnInit(): void {
    this.zoomReportForm = this.formBuilder.group({
      jobTitle: ['', Validators.required]
    });
/**
    this.trainerService.getAllTrainers().subscribe(res => {
      this.trainers = res.data;
    })
    this.courseService.getAllCourses().subscribe(res => {
      this.courses = res.data;
    })

    this.batchesScheduleService.getAllScheduledBatches().subscribe(res => {
      this.batches = res.data;
    }) */
  }

  submitBulkEnrollment(): void {
    if (this.fileToUpload !== null) {
      const zoomReportData = this.zoomReportForm.value;
      console.log("trainer id : " + zoomReportData.trainerId);
      console.log("batch id : " + zoomReportData.id);
      console.log("previousBatchCode : " + zoomReportData.previousBatchCode);
      this.studentBulkUploadService.submitBulkEnrollment(zoomReportData.trainerId, zoomReportData.id, this.fileToUpload!)
        .subscribe(
          response => {
            console.log('Bulk enrollment successful');
            this.toasterService.success("Bulk enrollment successful");

          },
          error => {
            console.error('Error during bulk enrollment:', error);
            this.toasterService.error("Error during bulk enrollment");
          }
        );
    } else {
      console.error('No file selected');
      this.toasterService.error("No file selected");
    }
  }

  jobLeadsBulkUpload(): void {
    if (this.fileToUpload !== null) {
      const zoomReportData = this.zoomReportForm.value;
   
      this.studentBulkUploadService.jobLeadsBulkUpload(zoomReportData.jobTitle, this.fileToUpload!)
        .subscribe(
          response => {
            console.log('Bulk enrollment successful');
            this.toasterService.success("Bulk enrollment successful");

          },
          error => {
            console.error('Error during bulk enrollment:', error);
            this.toasterService.error("Error during bulk enrollment");
          }
        );
    } else {
      console.error('No file selected');
      this.toasterService.error("No file selected");
    }
  }

  transferOldWebSiteDataToNewWebsite(): void {
    const zoomReportData = this.zoomReportForm.value;

    this.studentBulkUploadService.transferOldWebsiteDataToNewWebsite(zoomReportData.trainerId, zoomReportData.id, zoomReportData.previousBatchCode)
      .subscribe(
        response => {
          console.log('transferOldWebSiteDataToNewWebsite successful');
          this.toasterService.success("transferOldWebSiteDataToNewWebsite");
        },
        error => {
          console.error('Error during transferOldWebSiteDataToNewWebsite:', error);
          this.toasterService.error("Error during transferOldWebSiteDataToNewWebsite");
        }
      );
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    } else {
      this.fileToUpload = null;
    }
  }

  findBatchByCourseStatus(obj: any) {
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId == this.trainerId);
  }

}

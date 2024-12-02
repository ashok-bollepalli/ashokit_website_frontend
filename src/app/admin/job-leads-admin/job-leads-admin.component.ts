
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
  selector: 'app-job-leads-admin',
  templateUrl: './job-leads-admin.component.html',
  styleUrls: ['./job-leads-admin.component.scss']
})
export class JobLeadsAdminComponent implements OnInit {

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

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    } else {
      this.fileToUpload = null;
    }
  }

}

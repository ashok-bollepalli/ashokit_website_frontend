import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainerPaymentDTO } from 'src/app/dto/TrainerPaymentDTO';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { TeachableService } from 'src/app/services/teachable.service';
import { TeachableCourseDTO } from 'src/app/dto/TeachableCourseDTO';
import { ToastrService } from 'ngx-toastr';
import { TrainingModesDTO } from 'src/app/dto/TrainingModesDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';

@Component({
  selector: 'app-add-student-enrollment',
  templateUrl: './add-student-enrollment.component.html',
  styleUrls: ['./add-student-enrollment.component.scss']
})
export class AddStudentEnrollmentComponent implements OnInit {

  addStudentEnrollmentForm: FormGroup = this.formBuilder.group({});
  public trainers: TrainerDTO[] = [];
  public courses: CourseDTO[] = [];
  public counsellors: CounsellorDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];
  public teachableCourses: TeachableCourseDTO[] = [];
  selectedBatches: any[] = [];
  public trainerId: number = 1;
  public courseId: number = 1;
  // public id: number =1;
  public courseStatus: string = 'In-Progress';
  trainingModes: TrainingModesDTO[] = [];
  public countryCodes: CountryCodeDTO[] = [];

  public isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private counsellorService: CounsellorService,
    private addStudentEnrollmentService: AddStudentEnrollmentService,
    private batchesScheduleService: BatchesScheduleService,
    private teachableService: TeachableService,
    private dataLoaderService: DataLoaderService,
    private toaster: ToastrService) { }


  ngOnInit(): void {
    this.addStudentEnrollmentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      studentEmail: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      countryCode: ['91', Validators.required],
      // whatsappNumber: ['', Validators.required],
      // wtCountryCode: ['', Validators.required],
      dueAmount: ['', Validators.required],
      amountPaid: ['', Validators.required],
      videosAccess: ['', Validators.required],
      classType: ['', Validators.required],
      trainerId: ['0', Validators.required],
      // teachableCourseId: ['', Validators.required],
      courseStatus: ['', Validators.required],
      id: ['', Validators.required]
    });
    this.getAllTrainers();
    this.getAllCourses();
    this.getAllCounsellors();
    this.getAllScheduledBatches();
    // this.getAllTeachableCourses();
    this.getTrainingModes();
    this.getAllCountryCodes();
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

  getAllCounsellors() {
    this.counsellorService.getAllCounsellors().subscribe(res => {
      this.counsellors = res.data;
    })
  }


  getAllTeachableCourses() {
    this.teachableService.getAllTeachableCourses().subscribe(res => {
      this.teachableCourses = res.data;
    })
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

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe((res: any) => {
      this.batches = res.data;
    },
      (error) => {
        console.log('Error fetching schedule batches:', error);
      }
    )
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



  onSubmit(): void {
    if (this.addStudentEnrollmentForm.valid) {
      this.isLoading = true;
      let studentData = this.addStudentEnrollmentForm.value;
      studentData.batchId = studentData.id;
      this.addStudentEnrollmentService.addStudentEnrollment(studentData).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.isLoading=false;
        this.router.navigate(['/view-student']);
      })
    } else {
      this.toaster.error("Enter Details");
    }
  }


  findBatchByTrainer(e: any) {
    this.batches = this.batches.filter(data => data.trainerId == this.trainerId);
  }

  findBatchByCourseStatus(obj: any) {
    console.log('p', this.batches);
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId == this.trainerId);
    console.log('q', this.selectedBatches);
  }
  getAllCountryCodes() {
    this.trainerService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }
}

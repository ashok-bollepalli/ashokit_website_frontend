import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CounsellorDTO } from 'src/app/dto/CounsellorDTO';
import { CountryCodeDTO } from 'src/app/dto/CountryCodeDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { TeachableCourseDTO } from 'src/app/dto/TeachableCourseDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { AddStudentEnrollmentService } from 'src/app/services/add_student-enrollment.service';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TeachableService } from 'src/app/services/teachable.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {


  updateStudentEnrollmentForm: FormGroup = this.formBuilder.group({});
  public trainers: TrainerDTO[] = [];
  public courses: CourseDTO[] = [];
  public counsellors: CounsellorDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];
  public teachableCourses: TeachableCourseDTO[] = [];
  selectedBatches: any[] = [];
  public trainerId: number = 1;
  public courseId: number = 1;
  student!: StudentDTO;
  public countryCodes: CountryCodeDTO[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private addStudentEnrollmentService: AddStudentEnrollmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private counsellorService: CounsellorService,
    private batchesScheduleService: BatchesScheduleService,
    private teachableService: TeachableService,
    private toaster: ToastrService

  ) { }

  ngOnInit(): void {

    this.student = this.dataService.studentData;
    this.getAllTrainers();
    this.getAllCourses();
    this.getAllScheduledBatches();
    this.getAllTeachableCourses();
    this.getAllCountryCodes();
  }



  onSubmit(): void {
    if (this.student) {
      this.addStudentEnrollmentService.updateStudentInfo(this.student).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/view-student']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else {

    }
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

  findBatchByTrainer(e: any) {
    this.batches = this.batches.filter(data => data.trainerId == this.trainerId);
  }

  findBatchByCourseStatus(obj: any) {
    console.log('p', this.batches);
    this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value);
    console.log('q', this.selectedBatches);
  }

  getAllCountryCodes() {
    this.trainerService.getAllCountryCodes().subscribe(res => {
      this.countryCodes = res.data;
    })
  }
}

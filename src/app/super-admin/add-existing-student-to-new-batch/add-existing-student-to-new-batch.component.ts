import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { TeachableCourseDTO } from 'src/app/dto/TeachableCourseDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { TrainingModesDTO } from 'src/app/dto/TrainingModesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentService } from 'src/app/services/student.service';
import { TeachableService } from 'src/app/services/teachable.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-add-existing-student-to-new-batch',
  templateUrl: './add-existing-student-to-new-batch.component.html',
  styleUrls: ['./add-existing-student-to-new-batch.component.scss']
})
export class AddExistingStudentToNewBatchComponent implements OnInit {
  studentPaymentForm: FormGroup = this.formBuilder.group({});
  public trainers: TrainerDTO[] = [];
  public trainerId: any;
  public courseStatus: any;
  public studentId: any;
  public selectedBatches: any[] = [];
  public teachableCourses: TeachableCourseDTO[] = [];
  public batches: ScheduleBatchDTO[] = [];
  trainingModes: TrainingModesDTO[] = [];

  public isLoading = false;


  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private trainerService: TrainerService,
    private teachableService: TeachableService,
    private batchesScheduleService: BatchesScheduleService,
    private toaster: ToastrService,
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.studentId = +params['studentId'];
      this.studentPaymentForm = this.formBuilder.group({
        studentId: [this.studentId, Validators.required],
        trainerId: ['', Validators.required],
        courseStatus: ['', Validators.required],
        // teachableCourseId: ['', Validators.required],
        amountPaid: ['', Validators.required],
        dueAmount: ['', Validators.required],
        videosAccess: ['', Validators.required],
        classType: ['', Validators.required],
        batchId: ['', Validators.required]

      });
    });



    this.getAllTrainers();
    //this.getAllTeachableCourses();
    this.getAllScheduledBatches();
    this.getTrainingModes();
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
    this.trainerService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.log('Error fetching trainer:', error);
      }
    )
  }
  getAllTeachableCourses() {
    this.teachableService.getAllTeachableCourses().subscribe(res => {
      this.teachableCourses = res.data;
    })
  }

  onSumbit() {
    if (this.studentPaymentForm) {
      this.isLoading=true;
      const studentPaymentData = this.studentPaymentForm.value;
      this.studentService.addExistingStudentToNewBatch(studentPaymentData).subscribe(
        (res: any) => {
          this.isLoading=false;
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['super-admin/view-student'])
        },
        (error: any) => {
          console.error("Error:", error);
        }
      );
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
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TeachableCourseDTO } from 'src/app/dto/TeachableCourseDTO';
import { TrainingModesDTO } from 'src/app/dto/TrainingModesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CounsellorService } from 'src/app/services/counsellor.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TeachableService } from 'src/app/services/teachable.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-update-schedule-batch',
  templateUrl: './update-schedule-batch.component.html',
  styleUrls: ['./update-schedule-batch.component.scss']
})
export class UpdateScheduleBatchComponent implements OnInit {
  trainers: any[] = [];
  courses: any[] = [];
  counsellors: any[]=[];
  public teachableCourses: TeachableCourseDTO[] = [];
  trainingModes: TrainingModesDTO[] = [];
  public courseStatus!:string ;
  public trainerId!: number;
  public courseId!: number;
  public id!: number;
  scheduleBatch: ScheduleBatchDTO = {
    id: 0,
    courseName: '',
    trainer: '',
    counsellor: '',
    scheduleName: '',
    image:'',
    coursePrice: 0,
    offerPrice: 0,
    scheduleType: '',
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
    demoStatus:'',
    courseCategoryId:0,
    courseId:0,
    trainerId:0,
    counsellorId:0,
    clsrmTrngAvailable:''
  
  }

  constructor(
    private trainerService: TrainerService,
    private courseService: CourseServiceService,
    private counsellorService: CounsellorService,
    private batchService: BatchesScheduleService,
    private router: Router,
    private dataService: DataServiceService,
    private teachableService:TeachableService,
    private activeRoute: ActivatedRoute,
    private toaster: ToastrService,
    private dataLoaderService: DataLoaderService
  ) {}

  ngOnInit(): void {
    this.scheduleBatch = this.dataService.ScheduleBatchData;
    this.getAllCourses();
    this.getAllTrainers();
    this.getAllCounsellor();
    this. getAllTeachableCourses();
    this.getTrainingModes();
  }

  onSubmit(): void {
    if (this.scheduleBatch) { 
      this.batchService.updateScheduleBatch(this.scheduleBatch).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          this.router.navigate(['/super-admin/new-batch']);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } 
  }

  getAllCounsellor() {
    this.counsellorService.getAllCounsellors().subscribe(
      res => {
        this.counsellors = res.data;
      },
      error => { }
    )
  }


  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => { }
    )
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      res => {
        this.trainers = res.data;
      },
      error => { }
    )
  }
  getAllTeachableCourses(){
    this.teachableService.getAllTeachableCourses().subscribe(res => {
      this.teachableCourses = res.data;
    })
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-batch-notification',
  templateUrl: './batch-notification.component.html',
  styleUrls: ['./batch-notification.component.scss']
})
export class BatchNotificationComponent implements OnInit {

  batchNotificationForm: FormGroup = this.formBuilder.group({});
  public trainers: TrainerDTO[] = [];
  public courseId: number = 1;
  public trainerId: number = 1;
  public watiTemplates: any;
  public batches: ScheduleBatchDTO[] = [];
  public selectedBatches: ScheduleBatchDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private notificationService: NotificationService,
    private batchesScheduleService: BatchesScheduleService,

  ) { }

  ngOnInit(): void {
    this.batchNotificationForm = this.formBuilder.group({
      trainerName: [''],
      trainerId: [''],
      courseStatus: [''],
      batchId: [''],
      templateName: ['']      
    });
    this.getAllTrainers();
    this.getTemplateMessages();
    this.getAllScheduledBatches();
  }

  getAllTrainers() {
    this.notificationService.getAllTrainers().subscribe((res: any) => {
      this.trainers = res.data;
    },
      (error) => {
        console.log('Error fetching trainers:', error);
      }
    )
  }

  getTemplateMessages() {
    this.notificationService.getTemplateMessages().subscribe((res: any) => {
      this.watiTemplates = res.data;
    })
  }


  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe((res: any) => {
      this.batches = res.data;
      this.selectedBatches = res.data;
    },
      (error) => {
        console.log('Error fetching schedule batches:', error);
      }
    )
  }

  onSubmit() {
    this.notificationService.sendWatiSMSByBatch(this.batchNotificationForm.value).subscribe(
      (res: any) => {        
        this.toastrService.success('Notification sent successfully student count:!'+res.data);
      },
      (error: any) => {
        console.error('Error sending notification:', error);
        this.toastrService.error('Failed to send notification. Please try again.');
      }
    );
  }

  

  findBatchByCourseStatus(obj: any) {
     this.selectedBatches = this.batches.filter(data => data.courseStatus == obj.target.value && data.trainerId==this.batchNotificationForm.value.trainerId);
    
  }

}

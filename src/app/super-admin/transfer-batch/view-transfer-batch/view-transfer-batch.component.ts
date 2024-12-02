import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { TrainerDTO } from 'src/app/dto/TrainerDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-view-transfer-batch',
  templateUrl: './view-transfer-batch.component.html',
  styleUrls: ['./view-transfer-batch.component.scss']
})
export class ViewTransferBatchComponent implements OnInit {

  public sourceBatches: ScheduleBatchDTO[] = [];
  public targetBatches: ScheduleBatchDTO[] = [];
  public targetBatchId: number = 0;
  public sourceBatchId: number = 0;
  public trainers: TrainerDTO[] = [];
  public selectedBatches: any[] = [];
  public batches: ScheduleBatchDTO[] = [];
  public filteredSourceBatches: ScheduleBatchDTO[] = [];
  public filteredTargetBatches: ScheduleBatchDTO[] = [];
  public soureceTrainerId: any;
  public targetTrainerId: any;
  public sourceCourseStatus: any;
  public targetCourseStatus: any;

  constructor(
    private batchesScheduleService: BatchesScheduleService,
    private trainerService: TrainerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllScheduledBatches();
    this.getAllTrainers();
  }

  getAllScheduledBatches() {
    this.batchesScheduleService.getAllScheduledBatches().subscribe((res: any) => {
      this.sourceBatches = res.data;
      this.targetBatches = res.data;
    },
      (error) => {
        console.log('Error fetching schedule batches:', error);
      }
    )
  }

  transferBatch() {
    this.batchesScheduleService.transferBatch(this.sourceBatchId, this.targetBatchId).subscribe((res: any) => {
      this.toaster.success(res.data);
    },
      (error) => {
        this.toaster.error(error.data);
        console.log('Error transfer schedule batches:', error);
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

  sourceBatchFilter() {
    this.filteredSourceBatches = this.sourceBatches.filter((batch: ScheduleBatchDTO) => {
      return batch.trainerId == this.soureceTrainerId && batch.courseStatus == this.sourceCourseStatus;
    });
  }
  targetBatchFilter() {
    this.filteredTargetBatches = this.targetBatches.filter((batch: ScheduleBatchDTO) => {
      return batch.trainerId == this.targetTrainerId && batch.courseStatus == this.targetCourseStatus;
    });
  }
}


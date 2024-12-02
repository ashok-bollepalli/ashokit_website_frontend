import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchDTO } from 'src/app/dto/BatchDTO';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { UploadClassNotesDTO } from 'src/app/dto/UploadClassNotesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UploadClassNoteService } from 'src/app/services/uploadNotes/upload-class-note.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-uploadnotes',
  templateUrl: './update-uploadnotes.component.html',
  styleUrls: ['./update-uploadnotes.component.scss']
})
export class UpdateUploadnotesComponent {
  public updateUploadNotesForm: FormGroup  = this.formBuilder.group({});
  public courseStatus!: string;
  classNotes!: UploadClassNotesDTO;
  public uploadNotesFileName: File | null = null;
  public teachingCourses: UploadClassNotesDTO[] = [];
  filteredBatches: BatchDTO[] = [];
  batches: BatchDTO[] = [];
  public trainerId!: number;
  public batchCode!: string;
  public classNotesId: number=0;
  public courses: CourseDTO[] = [];
  public scheduleBatches: ScheduleBatchDTO[] =[];
  public filteredScheduleBatches: ScheduleBatchDTO[] =[];
 

  constructor(
    private batchesScheduleService: BatchesScheduleService,
    private dataService: DataServiceService,
    private uploadClassNoteService: UploadClassNoteService,
    private userStorageService: UserStorageService,
    private batchesSchedule: BatchesScheduleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private courseService: CourseServiceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.classNotes = this.dataService.uploadClassNotesData;
    this.updateUploadNotesForm = this.formBuilder.group({
      notesId:[this.classNotes.notesId],
      batchCode: [this.classNotes.batchCode],
      topicName: [this.classNotes.topicName],
      comments:[this.classNotes.comments],
      videoLink: [this.classNotes.videoLink],
      courseStatus:[this.classNotes.courseStatus],
      trainerId:[this.userStorageService.getTrainer().trainerId],
      uploadNotesFileName: [this.classNotes.uploadNotesFileName]


    });
    this.getAllCourses();
    this.trainerId = this.userStorageService.getTrainer().trainerId;
    this.getScheduleBatchByTrainer(this.trainerId);
  }
  filterBatchByStatus(){
    this.filteredBatches = this.batches.filter((batch:BatchDTO)=>{
      return batch.courseStatus.toLowerCase().trim().includes(this.courseStatus.toLowerCase().trim());
    })

  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
      }
    );
  }
  getScheduleBatchByTrainer(trainerId:number): void {
    this.batchesSchedule.getScheduleBatchByTrainer(trainerId).subscribe(
      res => {
       // this.scheduleBatches = res.data
        this.batches = res.data     
      },
      error => { }
    );
  }
  onSubmit(): void {
    if (this.updateUploadNotesForm.valid && this.uploadNotesFileName){
      const formData = this.updateUploadNotesForm.value;
      this.uploadClassNoteService.updateClassNotes(formData,this.uploadNotesFileName).subscribe(
        (res: any) => {
          console.log('Class note updated successfully:', res);
          this.router.navigate(['/trainer/dashboard']);
        },
        (error: any) => {
          console.error('Error updating class note:', error);
        }
      );
    } else {
      console.warn('Class notes data is not available.');
    }
  }

  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'image') {
        this.uploadNotesFileName = files[0];
      } 
    }
  }
}

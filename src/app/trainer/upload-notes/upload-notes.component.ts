import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BatchDTO } from 'src/app/dto/BatchDTO';
import { ScheduleBatchDTO } from 'src/app/dto/ScheduleBatchDTO';
import { UploadClassNotesDTO } from 'src/app/dto/UploadClassNotesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UploadClassNoteService } from 'src/app/services/uploadNotes/upload-class-note.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-upload-notes',
  templateUrl: './upload-notes.component.html',
  styleUrls: ['./upload-notes.component.scss']
})
export class UploadNotesComponent implements OnInit {
   public batches:BatchDTO[]=[];
   public filteredBatches:BatchDTO[]=[];
   public scheduleName:string='';
   public uploadNotesForm: FormGroup  = this.formBuilder.group({});
   public uploadNotesFileName: File | null = null;
   public courseStatus!:string;

  constructor(
    private uploadClassNoteService: UploadClassNoteService,
    private batchesScheduleService:BatchesScheduleService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllScheduledBatches();
    this.uploadNotesForm = this.formBuilder.group({
      batchCode: [''],
      topicName: [''],
      comments:[''],
      videoLink: [''],
      courseStatus:[''],
      trainerId:[this.userStorageService.getTrainer().trainerId],
      uploadNotesFileName: ['']


    });
 
   
  }

  sanitizeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  filterBatchByStatus(){
    const formData = this.uploadNotesForm.value;
    this.filteredBatches = this.batches.filter((batch:BatchDTO)=>{
      return batch.courseStatus.toLowerCase().trim().includes(formData.courseStatus.toLowerCase().trim());
    })

  }
  getAllScheduledBatches() {
    this.batchesScheduleService.getScheduleBatchByTrainer(this.userStorageService.getTrainer().trainerId).subscribe(
      res => {
        this.batches = res.data;
        this.filteredBatches = res.data;
      },

      error => {
        console.log('error1', error)
      }
    )
  }
  
  onSubmit(): void {
    if (this.uploadNotesForm.valid && this.uploadNotesFileName) {
      const formData = this.uploadNotesForm.value;
     // formData.trainerId = this.userStorageService.get
      this.uploadClassNoteService.addClassNote(formData, this.uploadNotesFileName).subscribe(
        (res: any) => {
          this.toastrService.success('Class note uploaded successfully!');
          this.router.navigate(['/trainer/dashboard']);
          this.uploadNotesForm.reset();
        },
        (error: any) => {
        }
      );
    } else {
      this.toastrService.error('Please fill in all required fields');
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

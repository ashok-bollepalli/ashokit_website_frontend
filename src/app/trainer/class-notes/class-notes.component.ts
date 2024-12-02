import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { UploadClassNotesDTO } from 'src/app/dto/UploadClassNotesDTO';
import { BatchesScheduleService } from 'src/app/services/batches-schedule.service';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UploadClassNoteService } from 'src/app/services/uploadNotes/upload-class-note.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-class-notes',
  templateUrl: './class-notes.component.html',
  styleUrls: ['./class-notes.component.scss']
})
export class ClassNotesComponent implements OnInit {

  public teachingCourses: UploadClassNotesDTO[] = [];
  public trainerId!: number;
  public batchCode!: string;
  public courses: CourseDTO[] = [];

  selectedFileUrl: SafeResourceUrl | null = null;

  constructor(
    private router: Router,
    private batchesSchedule: BatchesScheduleService,
    private courseService: CourseServiceService,
    private activatedRoute: ActivatedRoute,
    private userStorageService: UserStorageService,
    private uploadClassNoteService: UploadClassNoteService,
    private dataservice: DataServiceService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const batchCode = params.get('batchCode');
      if (batchCode) {
        this.batchCode = batchCode;
      } else {
        this.batchCode = '';
      }
    });
    this.getAllBatchNotesByTrainer();
    this.getAllCourses();
  }

  deleteNotes(notesId: number) {
    this.uploadClassNoteService.deleteNotes(notesId).subscribe(res => {
      console.log(res.data);
      this.getAllBatchNotesByTrainer();
    })
  }

  getAllBatchNotesByTrainer(): void {
    this.batchesSchedule.getAllBatchNotesByTrainer(this.userStorageService.getTrainer().trainerId, this.batchCode).subscribe(
      res => {
        this.teachingCourses = res.data;
      },
      error => {

      }
    );
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
  getCourseName(courseId: number): string {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    return foundCourse ? foundCourse.courseName : 'Unknown';
  }
  edit(teachingCourse: UploadClassNotesDTO) {
    this.dataservice.uploadClassNotesData = teachingCourse;
    this.router.navigate(['/trainer/update-uploadnotes']);
  }

  showFile1(teachingCourse: any) {
    const filePath = `../../../assets/upload-notes/${teachingCourse.batchCode}/${teachingCourse.uploadNotesFileName}`;
    
    this.http.get(filePath, { responseType: 'blob' }).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      
      // Open the Blob URL in a new tab
      const newTab = window.open();
      if (newTab) {
        newTab.location.href = url;
      } else {
        console.error('Failed to open new tab. Please allow pop-ups for this site.');
      }
    });
  }

  showFile(teachingCourse: any): void {
    const fileUrl = `../../../assets/upload-notes/${teachingCourse.batchCode}/${teachingCourse.uploadNotesFileName}`;
    console.log(fileUrl);
    // Open a new window
    const newWindow = window.open('', '_blank');

    if (newWindow) {
      // Create the HTML content for the new window
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
         <title>Ashok IT :: Best Software Training Institute in Hyderabad</title>
            <style>
                body { margin: 0; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
        </head>
        <body>
            <iframe src="${fileUrl}"></iframe>
        </body>
        </html>
      `);

      // Close the document to finish writing
      newWindow.document.close();
    }
  }

}

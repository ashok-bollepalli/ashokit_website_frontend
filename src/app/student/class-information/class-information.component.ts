import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentViewNotesDTO } from 'src/app/dto/StudentViewNotesDTO';
import { DataLoaderService } from 'src/app/services/data-loader.service';

@Component({
  selector: 'app-class-information',
  templateUrl: './class-information.component.html',
  styleUrls: ['./class-information.component.scss']
})
export class ClassInformationComponent implements OnInit {
  classNotes:StudentViewNotesDTO[]=[];
  batchCode!: string ;
  topicName: any;

  constructor(
    private dataLoaderService:DataLoaderService,
    private route: ActivatedRoute,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
      this.batchCode = params['batchCode'];
      this.getAllBatchCodeWithClassNotes(this.batchCode);      
    });

  }
  getAllBatchCodeWithClassNotes(batchCode: string) {
    this.dataLoaderService.getAllBatchCodeWithClassNotes(batchCode).subscribe(
      (res: any) => {
        this.classNotes = res.data;
      },
      (error) => {
        console.error('Error fetching class notes:', error);
      }
    );
  }

  get isTopicNameValid(): boolean {
    // Ensure classNotes is not empty and topicName is not undefined
    if (this.classNotes.length > 0 && this.classNotes[0].topicName) {
      this.topicName = this.classNotes[0].topicName;
      return this.topicName != "NA";
    }
    return false; // Return false if classNotes is empty or topicName is undefined
  }


  showFile(teachingCourse: any) {
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
}

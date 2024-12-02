import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MockInterviewsDTO } from 'src/app/dto/mockInterviewsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MockInterviewsService } from 'src/app/services/mock-interviews.service';

@Component({
  selector: 'app-edit-mock-interviews',
  templateUrl: './edit-mock-interviews.component.html',
  styleUrls: ['./edit-mock-interviews.component.scss']
})
export class EditMockInterviewsComponent implements OnInit {
  public Editor = ClassicEditor;
  public mockInterviews!: MockInterviewsDTO;
  public fullName: string = '';
  public content: string = '<p>Hello, world!</p>'; 
  mockInterviewsForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private mockInterviewsService: MockInterviewsService

  ) { }
  ngOnInit(): void {
    this.mockInterviews = this.dataService.mockInterviewsData;
    this.mockInterviewsForm = this.formBuilder.group({
        interviewsId:[this.mockInterviews?.interviewsId || 0],
        category: [this.mockInterviews?.category || '', Validators.required],
        fullName: [this.mockInterviews?.fullName || '', Validators.required],
        content: [this.mockInterviews?.content || ''],
        profileImage: [this.mockInterviews?.profileImage || ''],
        companyLogo: [this.mockInterviews?.companyLogo || '']
      });
  }

  onSubmit(): void {
    if (this.mockInterviewsForm.valid) {
      const mockInterviewsData = this.mockInterviewsForm.value;
      this.mockInterviewsService.updateMockInterview(mockInterviewsData).subscribe(
        (res: any) => {
          this.router.navigate(['/super-admin/list-mock-interviews']);
        },
        (error: any) => {
          console.error("Error:", error);
        }
      );
    }
  }

  updateMockInterview() {
    this.router.navigate(['/super-admin/list-mock-interviews']);
  }



 

}


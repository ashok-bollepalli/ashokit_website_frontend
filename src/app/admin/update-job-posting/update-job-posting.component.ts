import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobPostingDTO } from 'src/app/dto/JobPostingDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StudentJobsService } from 'src/app/services/student-jobs.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-job-posting',
  templateUrl: './update-job-posting.component.html',
  styleUrls: ['./update-job-posting.component.scss']
})
export class UpdateJobPostingComponent implements OnInit {
  public Editor = ClassicEditor;
  public jobPostings!: JobPostingDTO;
  companyImageFile: File | undefined;

  constructor(
    private dataServiceService: DataServiceService,
    private router: Router,
    private toaster: ToastrService,
    private studentJobService: StudentJobsService
  ) { }

  ngOnInit(): void {
    this.jobPostings = this.dataServiceService.jobPostingData; 
  }

  onSubmit() {
    if (this.jobPostings) {
      this.studentJobService.updateJobPostings(this.jobPostings, this.companyImageFile).subscribe(
        (res: any) => {
          this.toaster.success('Job posting updated successfully');
          this.router.navigate(['/admin/view-job-posting']);
        },
        (error) => {
          this.toaster.error('Error updating job posting');
          console.error('Error:', error);
        }
      );
    } else {
      this.toaster.error('Job posting data or ID is missing');
      console.error('Job posting data or ID is missing');
    }
  }
  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.companyImageFile = files[0];
    }else{
      this.companyImageFile = undefined;
    }
  }
}

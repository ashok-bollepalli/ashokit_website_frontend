import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { StudentJobsService } from 'src/app/services/student-jobs.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss']
})
export class JobsManagementComponent implements OnInit {
  public Editor = ClassicEditor;
  jobPostingForm: FormGroup = this.formBuilder.group({});
  companyImageFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userStorageService: UserStorageService,
    private studentJobService: StudentJobsService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.jobPostingForm = this.formBuilder.group({
      id: [''],
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      packageOffering: ['', Validators.required],
      jobLocation: ['', Validators.required],
      eligibility: ['', Validators.required],
      qualifications: ['', Validators.required],
      jobType: ['', Validators.required],
      link: ['', Validators.required],
      companyImage: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobPostingForm.valid) {
      const formData = this.jobPostingForm.value;
      this.studentJobService.addJobPostings(formData, this.companyImageFile).subscribe(
        res => {
          this.toaster.success('Data Added Successfully');
          this.router.navigate(['admin/view-job-posting']);
          this.jobPostingForm.reset();
        },
        err => {
          this.toaster.error('Failed to add data');
        }
      );
    }
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.companyImageFile = files[0];
    }
  }

}
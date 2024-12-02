import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  resumeFile: File | null = null;

  applicationForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      name: ['',],
      phone: ['',],
      email: ['',],
      position: ['',],
      qualification: ['',],
      resume: ['',],
      userComment: ['',]
    })
  }
  onSubmit(): void {
    if (this.applicationForm.valid  && this.resumeFile) {
      const jobApplicationData = this.applicationForm.value;
      if(this.resumeFile)
      this.dataLoaderService.createJobApplication(jobApplicationData ,this.resumeFile).subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.router.navigate(['/placements']);
      })
    }

  }

  onResumeFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.resumeFile = files[0];
    }
  }
}

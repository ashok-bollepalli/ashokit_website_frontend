import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataLoaderService } from '../services/data-loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.scss']
})
export class InternshipFormComponent implements OnInit {

  applicationForm: FormGroup = this.formBuilder.group({});
  resumeFile: File | null = null;
  constructor(private formBuilder: FormBuilder,
    private dataLoaderService: DataLoaderService,
    private toastrService: ToastrService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      name: ['',],
      phone: ['',],
      position: [''],
      createdAt: [''],
      email: ['',],
      role: ['',],
      qualification: ['',],
      resume: ['',],
      userComment: ['',]
    })
  }
  onSubmit(): void {
    if (this.applicationForm.valid && this.resumeFile) {
      const jobApplicationData = this.applicationForm.value;
      if (this.resumeFile)
        this.dataLoaderService.createJobApplication(jobApplicationData, this.resumeFile).subscribe(res => {
          this.toastrService.success('Data Added Successfully');
          this.router.navigate(['/internships']);
        })
    }

  }

}


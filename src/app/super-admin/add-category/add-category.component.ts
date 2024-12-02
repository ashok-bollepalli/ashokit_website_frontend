import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  interviewCategoryForm: FormGroup = this.formBuilder.group({})

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private interviewCategoryService: InterviewCategoryService,
    private userStorageService: UserStorageService) { }
    
  ngOnInit(): void {

    this.interviewCategoryForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      name: ['', Validators.required],
      metaTitle: ['', Validators.required],
      metaDescription: ['', Validators.required],
      description: [''],
      slug:['',Validators.required],
    });

  }

  onSubmit() {
    if (this.interviewCategoryForm.valid) {
      const interviewCategoryData = this.interviewCategoryForm.value;
      this.interviewCategoryService.addInterviewCategory(interviewCategoryData).subscribe(res => {
        if (this.userStorageService.getRole() == 'SUPERADMIN') {
          this.router.navigate(['/super-admin/view-interview-category']);
        } else {
          this.router.navigate(['/admin/view-interview-category']);
        }
      });
    }
  }
}

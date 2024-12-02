import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { MockInterviewsService } from 'src/app/services/mock-interviews.service';

@Component({
  selector: 'app-add-mock-interviews',
  templateUrl: './add-mock-interviews.component.html',
  styleUrls: ['./add-mock-interviews.component.scss']
})
export class AddMockInterviewsComponent implements OnInit {
  public Editor = ClassicEditor;
  mockInterviewsForm: FormGroup = this.formBuilder.group({});
  profileImageFile: File | null = null;
  companyLogoFile: File | null = null;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private mockInterviewsService: MockInterviewsService,
    private toaster: ToastrService) { }

  ngOnInit(): void {

    this.mockInterviewsForm = this.formBuilder.group({
      category: ['', Validators.required],
      fullName: ['', Validators.required],
      content: [''],
      profileImage:  ['', Validators.required],
      companyLogo:  ['', Validators.required],
      status  : [''],
      proStatus: ['']
    });
  }
  onSubmit(): void {
    if (this.profileImageFile && this.companyLogoFile) {
      const mockInterviewsData = this.mockInterviewsForm.value;
      if (this.profileImageFile ) {
      this.mockInterviewsService
      .addMockInterviews(mockInterviewsData,this.profileImageFile,this.companyLogoFile)
      .subscribe(res => {
        this.toaster.success('Data Added Successfully');
        this.router.navigate(['/super-admin/list-mock-interviews']);
      },
        error => {

        })
    }
  }
}

onFileChange(event: any, fileType: string): void {
  const files: FileList = event.target.files;
  if (files.length > 0) {
    if (fileType === 'profileImage') {
      this.profileImageFile = files[0];
    } else if (fileType === 'companyLogo') {
      this.companyLogoFile = files[0];
    }
  }

}


}


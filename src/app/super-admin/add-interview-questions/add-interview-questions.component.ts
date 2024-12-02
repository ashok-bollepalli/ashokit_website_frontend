import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { InterviewQuestionService } from 'src/app/services/interview-question.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-interview-questions',
  templateUrl: './add-interview-questions.component.html',
  styleUrls: ['./add-interview-questions.component.scss']
})
export class AddInterviewQuestionsComponent {
  public Editor = ClassicEditor;
  interviewQuestionForm: FormGroup = this.formBuilder.group({});
  interviewCategorys: InterviewCategoryDTO[] = [];
  coverImageFile: File | null = null;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private interviewQuestionService: InterviewQuestionService,
    private interviewCategoryService: InterviewCategoryService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService) { }

  ngOnInit(): void {
    this.interviewCategoryService.getAllInterviewCategory().subscribe(res => {
      this.interviewCategorys = res.data;
    })
    this.interviewQuestionForm = this.formBuilder.group({
      categoryId: [1, Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      coverImage: ['']
    });
  }

  onSubmit() {
    if (this.interviewQuestionForm.valid) {
      const interviewQuestionData = this.interviewQuestionForm.value;
      console.log('Form Data:', interviewQuestionData); // Debugging line

      this.interviewQuestionService.addInterviewQuestion(interviewQuestionData, this.coverImageFile).subscribe(
        res => {
          this.toaster.success('Data Added Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-interview-question']);
          } else {
            this.router.navigate(['/admin/view-interview-question']);
          }
        });
    }
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.coverImageFile = files[0];
    }
  }

}


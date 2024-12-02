import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from 'src/app/dto/InterviewQuestionDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { InterviewQuestionService } from 'src/app/services/interview-question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-interview-questions',
  templateUrl: './update-interview-questions.component.html',
  styleUrls: ['./update-interview-questions.component.scss']
})
export class UpdateInterviewQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
 public interviewQuestion!: InterviewQuestionDTO;
 interviewCategorys:InterviewCategoryDTO [] = [];
  // courseName: string = '';

  constructor(private router: Router,
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private interviewQuestionService: InterviewQuestionService,
    private toaster: ToastrService,
    private interviewCategoryService : InterviewCategoryService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit() {
    this.interviewCategoryService.getAllInterviewCategory().subscribe(res=>{
      this.interviewCategorys = res.data;
    })
    this.interviewQuestion = this.dataService.interviewQuestionData;
    this.getAllInterviewCategory();
  }
  
  onSubmit() {
    if (this.interviewQuestion) {
      this.interviewQuestionService.updateInterviewQuestion(this.interviewQuestion).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-interview-question']);
          } else {
            this.router.navigate(['/admin/view-interview-question']);
          }
        });
    }
  }


  updateInterviewQuestion() {
    this.router.navigate(['super-admin/view-interview-question'])
  }
  getAllInterviewCategory() {
    this.interviewCategoryService.getAllInterviewCategory().subscribe(
      res => {
    //    this.filteredInterviewCategories = res.data;
        this.interviewCategorys = res.data;

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

}

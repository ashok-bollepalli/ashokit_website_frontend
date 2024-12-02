import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { InterviewQuestionDTO } from 'src/app/dto/InterviewQuestionDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { InterviewQuestionService } from 'src/app/services/interview-question.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-interview-question',
  templateUrl: './view-interview-question.component.html',
  styleUrls: ['./view-interview-question.component.scss']
})
export class ViewInterviewQuestionComponent implements OnInit {
  filteredInterviewQuestions: InterviewQuestionDTO[] = [];
  interviewQuestions: InterviewQuestionDTO[] = [];
  categoryId: number = 1;
  interviewCategories: InterviewCategoryDTO[] = [];
  isExpanded = false;
  name: string = '';
  question: string = '';
  
  public pageSize: number = 10; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private interviewQuestionService: InterviewQuestionService,
    private dataService: DataServiceService,
    private interviewCategoryService: InterviewCategoryService,
    private userStorageService: UserStorageService
  ) { }
  ngOnInit() {
    this.getAllInterviewQuestion();
    this.getAllInterviewCategory();
  }
  getAllInterviewCategory() {
    this.interviewCategoryService.getAllInterviewCategory().subscribe(
      res => {
        this.interviewCategories = res.data;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  getAllInterviewQuestion() {
    this.interviewQuestionService.getAllInterviewQuestion().subscribe(
      res => {
        this.filteredInterviewQuestions = res.data;
        this.interviewQuestions = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  calculateTotalPages() {
    if (this.filteredInterviewQuestions) {
      this.totalItems = this.filteredInterviewQuestions.length;
    } else {
      this.totalItems = 0;
    }
  }
  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
  filter() {
    this.filteredInterviewQuestions = this.interviewQuestions.filter((interviewQuestion: InterviewQuestionDTO) => {
      const matchedCourseCategoryId = interviewQuestion.categoryId == this.categoryId;
      const matchedInterviewQuestion = interviewQuestion.question == this.question;
        return matchedCourseCategoryId && matchedInterviewQuestion
          
      }
    );
    this.calculateTotalPages();
  }
  
  addInterviewQuestions() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-interview-questions']);
    } else {
      this.router.navigate(['admin/add-interview-questions']);
    }
  }
  editInterview(interviewQuestion: InterviewQuestionDTO) {
    this.dataService.interviewQuestionData = interviewQuestion;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-interview-questions']);
    } else {
      this.router.navigate(['/admin/update-interview-questions']);
    }
  }
  getCategoryName(categoryId: number): string {
    const foundCategory = this.interviewCategories.find(category => category.categoryId === categoryId);
    return foundCategory ? foundCategory.name : 'Unknown';
  }
  deleteInterviewQuestion(interviewQuestionId: number) {
    this.interviewQuestionService.deleteInterviewQuestion(interviewQuestionId).subscribe((res) => {
      this.getAllInterviewQuestion();
      this.filter();
    });
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
}
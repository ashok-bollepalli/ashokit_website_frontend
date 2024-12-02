import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewCategoryDTO } from 'src/app/dto/InterviewCategoryDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { InterviewCategoryService } from 'src/app/services/interview-category.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-interview-category',
  templateUrl: './view-interview-category.component.html',
  styleUrls: ['./view-interview-category.component.scss']
})
export class ViewInterviewCategoryComponent implements OnInit {

  filteredInterviewCategories: any[] = [];
  interviewCategory: any;
  interviewCategorys: InterviewCategoryDTO[] = [];

  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  
  name: string = '';

  constructor(private router: Router,
    private interviewCategoryService: InterviewCategoryService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit() {
    this.getAllInterviewCategory();
  }
  getAllInterviewCategory() {
    this.interviewCategoryService.getAllInterviewCategory().subscribe(
      res => {
        this.filteredInterviewCategories = res.data;
        this.interviewCategorys = res.data;

      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  calculateTotalPages() {
    if (this.filteredInterviewCategories) {
      this.totalItems = this.filteredInterviewCategories.length;
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
    this.filteredInterviewCategories = this.interviewCategorys.filter(
      (interviewCategory: InterviewCategoryDTO) => {
        return interviewCategory.name
          .toLowerCase().trim()
          .includes(this.name.toLowerCase().trim());
      }
    );
  }
  edit(interviewCategory: InterviewCategoryDTO) {
    this.dataService.interviewCategoryData = interviewCategory;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-course-category']);
    } else {
      this.router.navigate(['/admin/update-course-category']);
    }
  }

  addCategory() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-category']);
    } else {
      this.router.navigate(['admin/add-category']);
    }
  }

  deleteInterviewCategory(interviewCategoryId: number) {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.interviewCategoryService.deleteInterviewCategory(interviewCategoryId).subscribe((res) => {
        this.getAllInterviewCategory();
        this.filter();
      });
    }
    else {
      this.interviewCategoryService.deleteInterviewCategory(interviewCategoryId).subscribe((res) => {
        this.getAllInterviewCategory();
        this.filter();
      });
    }
  }
}


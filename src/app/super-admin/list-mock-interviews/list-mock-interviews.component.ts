import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MockInterviewsDTO } from 'src/app/dto/mockInterviewsDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MockInterviewsService } from 'src/app/services/mock-interviews.service';

@Component({
  selector: 'app-list-mock-interviews',
  templateUrl: './list-mock-interviews.component.html',
  styleUrls: ['./list-mock-interviews.component.scss']
})
export class ListMockInterviewsComponent implements OnInit {
  filteredTables: MockInterviewsDTO[] = [];
  mockInterviews: MockInterviewsDTO[] = [];
  name: string = '';

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private mockInterviewsService: MockInterviewsService,
    private dataService: DataServiceService) { }


  ngOnInit() {
    this.getAllMockInterviews();
  }

  getAllMockInterviews() {
    this.mockInterviewsService.getAllMockInterviews().subscribe(
      res => {
        this.mockInterviews = res.data;
        this.filter();
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  calculateTotalPages() {
    if (this.filteredTables) {
      this.totalItems = this.filteredTables.length;
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

  addmockinterviews() {
    this.router.navigate(['/super-admin/add-mock-interviews']);
  }
  filter() {
    this.filteredTables = this.mockInterviews.filter(
      (mockInterview: MockInterviewsDTO) => {
        return mockInterview.fullName
          .toLowerCase().trim()
          .includes(this.name.toLowerCase().trim());
      }
    );

    console.log(this.filteredTables);

  }

  editMock(mockInterviews: MockInterviewsDTO) {
    this.dataService.mockInterviewsData = mockInterviews;
    this.router.navigate(['/super-admin/edit-mock-interviews']);
  }
  deleteMockInterview(mockInterviewId: number) {
    this.mockInterviewsService.deleteMockInterview(mockInterviewId).subscribe((res) => {
      this.getAllMockInterviews();
      this.filter();
    });
  }

}
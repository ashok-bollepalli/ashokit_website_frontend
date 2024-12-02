import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MockInterviewFeeDTO } from 'src/app/dto/MockInterviewFeeDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MockInterviewFeeService } from 'src/app/services/mock-interview-fee.service';


@Component({
  selector: 'app-list-mock-interviews-fee',
  templateUrl: './list-mock-interviews-fee.component.html',
  styleUrls: ['./list-mock-interviews-fee.component.scss']
})
export class ListMockInterviewsFeeComponent {
  filteredEmployments: MockInterviewFeeDTO[] = [];
  mockInterviewFees: MockInterviewFeeDTO[] = [];
  roles: String = '';
  
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private mockInterviewFeeService: MockInterviewFeeService,
    private dataService: DataServiceService) { }

  filter() {
    this.filteredEmployments = this.mockInterviewFees.filter(
      (employment: MockInterviewFeeDTO) => {
        return employment.roles
          .toLowerCase().trim()
          .includes(this.roles.toLowerCase().trim());
      }
    );
  }

  ngOnInit() {
    this.getAllMockInterviewFee();
  }


  getAllMockInterviewFee() {
    this.mockInterviewFeeService.getAllMockInterviewFee().subscribe(
      res => {
        this.mockInterviewFees = res.data;
        this.filteredEmployments = res.data;
        this.filter();
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    )
  }

  calculateTotalPages() {
    if (this.filteredEmployments) {
      this.totalItems = this.filteredEmployments.length;
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

  addempolyment() {
    this.router.navigate(['/super-admin/add-employment']);
  }
  updateEmployment(mockInterviewFee: MockInterviewFeeDTO) {
    this.dataService.mockInterviewFeeData = mockInterviewFee;
    this.router.navigate(['/super-admin/update-employment']);
  }
  deleteMockInterviewFee(mockInterviewFeeId: number) {
    this.mockInterviewFeeService.deleteMockInterviewFee(mockInterviewFeeId).subscribe((res) => {
      this.getAllMockInterviewFee();
      this.filter();
    });
  }



}
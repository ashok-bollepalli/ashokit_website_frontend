import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddCompanyEnquiriesComponent } from 'src/app/counselor/add-company-enquiries/add-company-enquiries.component';
import { AddCompanyEnquiriesDTO } from 'src/app/dto/AddCompanyEnquiriesDTO';
import { EnquiriesService } from 'src/app/services/enquiries.service';

@Component({
  selector: 'app-company-enquiry',
  templateUrl: './company-enquiry.component.html',
  styleUrls: ['./company-enquiry.component.scss']
})
export class CompanyEnquiryComponent implements OnInit {
  companies: AddCompanyEnquiriesDTO[] = [];
  filteredCompanies: any[] = [];
  showCount: number = 30;
  companyName: string = '';
  fromDate: string = '';
  toDate: string = '';
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private router: Router,
    private companyEnquiryService: EnquiriesService,
  ) {}

  ngOnInit(): void {
    this.getAllCompanyEnquiries();
  }

  getAllCompanyEnquiries() {
    this.companyEnquiryService.getAllCompanyEnquiries().subscribe(
      res => {
        this.companies = res.data;
        this.filteredCompanies = res.data;
      },
      error => {
        console.log('error1', error);
      }
    );
  }

  applyFilters() {
    this.filteredCompanies = this.companies.filter((company: AddCompanyEnquiriesDTO) => {
    const matchedComanyName = company.companyName.toLowerCase().trim() == this.companyName.toLowerCase().trim();
    return matchedComanyName;
    });
  }
  calculateTotalPages() {
    if (this.filteredCompanies) {
      this.totalItems = this.filteredCompanies.length;
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
}

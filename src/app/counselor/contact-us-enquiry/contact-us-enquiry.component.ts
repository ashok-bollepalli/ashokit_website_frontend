import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactUsDTO } from 'src/app/dto/ContactUsDTO';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-contact-us-enquiry',
  templateUrl: './contact-us-enquiry.component.html',
  styleUrls: ['./contact-us-enquiry.component.scss']
})
export class ContactUsEnquiryComponent implements OnInit {

  contactUsEnquiries: ContactUsDTO[] = [];
  public name: string = '';
  public leadStatus: string = '';
  
  public pageSize: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  filteredContactUsEnquiries: ContactUsDTO[] = [];

  constructor(
    private usersResponseService: UsersResponseService
  ) { }

  ngOnInit(): void {
    this.getAllContactUsEnquiries();
  }

  getAllContactUsEnquiries() {
    this.usersResponseService.getAllContactUsEnquiries().subscribe(
      res => {
        this.contactUsEnquiries = res.data;
        this.filteredContactUsEnquiries = res.data;
        this.filter();
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  calculateTotalPages() {
    if (this.filteredContactUsEnquiries) {
      this.totalItems = this.filteredContactUsEnquiries.length;
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
    console.log('Search term:', this.name);
    this.filteredContactUsEnquiries = this.contactUsEnquiries.filter(
      (contactUsDTO: ContactUsDTO) => {
        return contactUsDTO.name
          .toLowerCase()
          .includes(this.name.toLowerCase());
      }
    );
    this.filteredContactUsEnquiries = this.filteredContactUsEnquiries.filter(
      (contactUsDTO: ContactUsDTO) => {
        return contactUsDTO.leadStatus
          .toLocaleLowerCase()
          .includes(this.leadStatus.toLocaleLowerCase());
      }

    );
    this.calculateTotalPages();
  }

  generateExcel() {
    const excelContent = this.constructExcelContent();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ContactUsEnquiries');
    XLSX.writeFile(wb, 'contactUsEnquiries.xlsx');
  }

  private constructExcelContent(): any[] {
    return this.contactUsEnquiries.map(contactUsEnquiry => ({
      'Id': contactUsEnquiry.id,
      'Name': contactUsEnquiry.name,
      'Email': contactUsEnquiry.emailId,
      'Phone Number': contactUsEnquiry.phoneNo,
      'Country Code': contactUsEnquiry.countryCode,
      'Subject': contactUsEnquiry.subject,
      'Message': contactUsEnquiry.message,
      'Comment': contactUsEnquiry.comment,
      'Created At': contactUsEnquiry.createdAt,
      'Updated At': contactUsEnquiry.updatedAt,
      'Lead Status': contactUsEnquiry.leadStatus
    }));
  }

}

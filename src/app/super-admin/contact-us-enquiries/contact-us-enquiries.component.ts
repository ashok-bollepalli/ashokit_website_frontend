import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsDTO } from 'src/app/dto/ContactUsDTO';
import { EnquiryService } from 'src/app/services/Enquiry/enquiry.service';
import { EnquiriesService } from 'src/app/services/enquiries.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contact-us-enquiries',
  templateUrl: './contact-us-enquiries.component.html',
  styleUrls: ['./contact-us-enquiries.component.scss']
})
export class ContactUsEnquiriesComponent implements OnInit {
  public enquiries: ContactUsDTO[] = [];
  public filteredEnquiries: ContactUsDTO[] = [];
  public name: string = '';
  public leadStatus: string = '';
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  public selectedContactUsEnquiry: ContactUsDTO = {
    id: 0,
    name: '',
    emailId: '',
    phoneNo: '',
    countryCode: 0,
    subject: '',
    message: '',
    comment: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    leadStatus: ''
  };
  public comment!:string;
  
  constructor(
    private router: Router,
    private usersResponseService: UsersResponseService,
    private enquiryService:EnquiryService
  ) { }
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    this.usersResponseService.getAllEnquiries().subscribe(
      res => {
        this.enquiries = res.data;
        this.filteredEnquiries = res.data;
      },
      error => {
        console.log('error1', error);
      }
    );
  }

  applyFilters() {
      this.filteredEnquiries = this.enquiries.filter((enquiry: ContactUsDTO) => {
        const matchedLeadStatus = enquiry.leadStatus == this.leadStatus;
        return  matchedLeadStatus;
      });
    this.calculateTotalPages();
  }
  
  calculateTotalPages() {
    if (this.filteredEnquiries) {
      this.totalItems = this.filteredEnquiries.length;
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

  generateExcel() {
    const excelContent = this.constructExcelContent();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ContactUsEnquiries');
    XLSX.writeFile(wb, 'enquiries.xlsx');
  }
  
  private constructExcelContent(): any[] {
    return this.enquiries.map(contactUsEnquiry => ({
      'Id': contactUsEnquiry.id,
      'Name': contactUsEnquiry.name,
      'Email':contactUsEnquiry.emailId,
      'Phone Number':contactUsEnquiry.phoneNo,
      'Country Code':contactUsEnquiry.countryCode,
      'Message':contactUsEnquiry.message,
      'Comment': contactUsEnquiry.comment,
      'Created At': contactUsEnquiry.createdAt,
      'Updated At': contactUsEnquiry.updatedAt,
      'Lead Status': contactUsEnquiry.leadStatus
    }));
  }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
  openModal(enquiry:any): void {
    this.selectedContactUsEnquiry = {
      ...enquiry,
      comment: '', 
    };
    const modalElement = document.querySelector('.modal') as HTMLElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }
  updateLeadStatus(){
    this.enquiryService.updateContactUsEnquiryStatusAndComments( this.selectedContactUsEnquiry.id,  
      this.selectedContactUsEnquiry.leadStatus, 
      this.selectedContactUsEnquiry.comment).subscribe((res) => {
      this.closeModal();
      this.getAllEnquiries();
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentBulkUploadService } from 'src/app/services/student-bulk-upload.service';

@Component({
  selector: 'app-jobleads',
  templateUrl: './jobleads.component.html',
  styleUrls: ['./jobleads.component.scss']
})
export class JobleadsComponent implements OnInit {

  public jobLeads: any[] = [];

  public jobTitle: any;


  public pageSize: number = 15;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private studentBulkUploadService: StudentBulkUploadService
  ) { }


  ngOnInit(): void {
    this.getAllJobLeads();
  }


  getAllJobLeads() {
    this.studentBulkUploadService.getAllJobLeads().subscribe(
      res => {
        this.jobLeads = res.data;
      },
      error => {
        console.log('error1', error)
      }
    )
  }

  onJobTitleChange(event: Event): void {
    const selectedEventId = (event.target as HTMLSelectElement).value;

    if (selectedEventId) {
      this.studentBulkUploadService.getAllJobLeadsWithTitle(selectedEventId).subscribe(
        res => {
          this.jobLeads = res.data;
        },
        error => {
          console.log('error1', error)
        }
      )
    } else {
      console.log('No event selected');
    }
  }

  onExpChange(event: Event): void {
    const selectedExp = (event.target as HTMLSelectElement).value;
  
    if (selectedExp) {
      if (this.jobLeads && this.jobLeads.length > 0) {
        if (selectedExp.toLowerCase() === 'freshers') {
          this.jobLeads = this.jobLeads.filter((lead: any) =>
            lead.totalExp.toLowerCase().startsWith('0') || lead.totalExp.toLowerCase().startsWith('fresher')
          );
        } else if (selectedExp.toLowerCase() === 'experienced') {
          this.jobLeads = this.jobLeads.filter((lead: any) =>
            !lead.totalExp.toLowerCase().startsWith('0') && !lead.totalExp.toLowerCase().startsWith('fresher')
          );
        }
      } else {
        console.log('No job leads to filter.');
      }
    }
  } 
  

  calculateTotalPages() {
    if (this.jobLeads) {
      this.totalItems = this.jobLeads.length;
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

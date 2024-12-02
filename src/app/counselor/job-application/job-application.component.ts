import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobApplicationDTO } from 'src/app/dto/JobApplicationDTO';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent implements OnInit {

  public filteredApplications: any[] = [];
  public applications: JobApplicationDTO[] = [];
  public name: string = '';
  public role: string = '';
  
  public pageSize: number = 5; 
  public currentPage: number = 1; 
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private usersResponseService: UsersResponseService) { }



  ngOnInit(): void {
    this.getAllJobApplications();
  }

  getAllJobApplications() {
    this.usersResponseService.getAllJobApplications().subscribe(
      res => {
        this.applications = res.data;
        this.applyFilters();
      },
      error => {
        console.log('error1', error)
      }
    )
  }
  applyFilters() {
    this.filteredApplications = this.applications.filter(
      (jobApplicationDTO: JobApplicationDTO) => {
        return jobApplicationDTO.name.toLowerCase().includes(this.name.toLowerCase());
      }
    );
    this.filteredApplications = this.applications.filter(
      (jobApplicationDTO: JobApplicationDTO) => {
        return jobApplicationDTO.role.toLowerCase().includes(this.role.toLowerCase());
      }
    );

    this.calculateTotalPages();
  }

  calculateTotalPages() {
    if (this.filteredApplications) {
      this.totalItems = this.filteredApplications.length;
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
    if (excelContent.length === 0) {
      console.error('No data available to generate Excel.');
      return;
    }
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelContent);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Applications');
      XLSX.writeFile(wb, 'applications.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  }
  
  private constructExcelContent(): any[] {
    return this.applications.map(applications => ({
      'Id': applications.id,
      'Name': applications.name,
      'Email': applications.email,
      'Phone': applications.phone,
      'Role': applications.role,
      'Position': applications.position,
      'Qualification': applications.qualification,
      'Resume': applications.resume,
      'UserComment': applications.userComment
    }));
  }
}



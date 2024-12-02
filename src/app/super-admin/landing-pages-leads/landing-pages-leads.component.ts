import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { LandingPagesDTO } from 'src/app/dto/LandingPagesDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-landing-pages-leads',
  templateUrl: './landing-pages-leads.component.html',
  styleUrls: ['./landing-pages-leads.component.scss']
})
export class LandingPagesLeadsComponent implements OnInit{
  public filteredLandingPage: LandingPagesDTO[] = [];
  public landingPages: LandingPagesDTO[] = [];
  public courses: CourseDTO[] = [];
  public courseName: string = "";
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private usersResponseService: UsersResponseService,
    private courseService: CourseServiceService
  ) {}
  ngOnInit(): void {
    this.getAllCourses();
   this.getAllLandingPages();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;
        
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getAllLandingPages() {
    this.usersResponseService.getAllLandingPages().subscribe(
      res => {
        this.landingPages = res.data;
        this.applyFilters();
      },
      error => {
        console.error('Error fetching landing pages:', error);
      }
    );
  } 

  applyFilters() {
    this.filteredLandingPage = this.landingPages.filter(
      (LandingPagesLeads: LandingPagesDTO) => {
        return LandingPagesLeads.courseName
          .toLowerCase()
          .includes(this.courseName.toLowerCase());
      }
    );
    this.calculateTotalPages();
  }
  calculateTotalPages() {
    if (this.filteredLandingPage) {
      this.totalItems = this.filteredLandingPage.length;
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
    XLSX.utils.book_append_sheet(wb, ws, 'LandingPages');
    XLSX.writeFile(wb, 'landingPages.xlsx');
  }
  
  private constructExcelContent(): any[] {
    return this.landingPages.map(LandingPages => ({
      'Name': LandingPages.name,
      'Email':LandingPages.emailId,
      'Phone Number':LandingPages.phone,
      'CourseName':LandingPages.courseName,

    }));
  }
}


                                        



       


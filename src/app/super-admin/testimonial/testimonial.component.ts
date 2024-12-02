import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialDTO } from 'src/app/dto/TestimonialDTO';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  testimonials: TestimonialDTO[] = [];
  filteredTestimonails: TestimonialDTO[] = [];
  public name: string = '';

  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private testimonialService: TestimonialService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.getAllTestimonial();

  }

  getAllTestimonial(): void {
    this.testimonialService.getAllTestimonial().subscribe(
      res => {
        this.testimonials = res.data;
        this.filteredTestimonails = res.data;
      },
      error => {
        console.error('Error fetching social settings:', error);
      }
    );
  }

  editTestimonial(testimonial: TestimonialDTO): void {
    this.dataService.testimonialData = testimonial;
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/update-testimonial']);
    } else {
      this.router.navigate(['/admin/update-testimonial']);
    }
  }

  updateTestimonialStatus(id: number, status: string) {
    if (status === 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    this.testimonialService.updateTestimonialStatus(id, status).subscribe((res) => {
      this.getAllTestimonial();
      this.filter();
    });
  }

  addtestimonail() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-testimonial']);
    } else {
      this.router.navigate(['/admin/add-testimonial']);
    }
  }

  filter() {
    this.filteredTestimonails = this.testimonials.filter(
      (testimonials: TestimonialDTO) => {
        return testimonials.name
          .toLowerCase()
          .trim()
          .includes(this.name.toLowerCase().trim());
      }
    )
    this.calculateTotalPages();
  }


  calculateTotalPages() {
    if (this.filteredTestimonails) {
      this.totalItems = this.filteredTestimonails.length;
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
  deleteTestimonial(testimonialId: number) {
    this.testimonialService.deleteTestimonial(testimonialId).subscribe((res) => {
      this.getAllTestimonial();
      this.filter();
    });
  }
}

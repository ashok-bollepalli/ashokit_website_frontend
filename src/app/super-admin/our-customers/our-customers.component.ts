import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OurCustomerDTO } from 'src/app/dto/OurCustomerDTO';
import { UsersResponseService } from 'src/app/services/users-response.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-our-customers',
  templateUrl: './our-customers.component.html',
  styleUrls: ['./our-customers.component.scss']
})
export class OurCustomersComponent implements OnInit {
  public filteredCustomers: OurCustomerDTO[] = [];
  public customers: OurCustomerDTO[] = [];
  public searchQuery: string = '';
  public name: string = '';
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private router: Router,
    private usersResponseService: UsersResponseService) { }


  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.usersResponseService.getAllCustomers().subscribe(
      res => {
        this.customers = res.data;
        this.filteredCustomers = res.data;
      },
      error => {
        console.log('error1', error)
      }
    );
  }
  applyFilters() {
    console.log('Search Query:', this.searchQuery);
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log('Filtered Customers:', this.filteredCustomers);
    this.calculateTotalPages();
  }
  

  calculateTotalPages() {
    if (this.filteredCustomers) {
      this.totalItems = this.filteredCustomers.length;
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
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'customers.xlsx');
  }
  
  private constructExcelContent(): any[] {
    return this.customers.map(Customers => ({
      'Id': Customers.id,
      'Name': Customers.name,
      'UserId':Customers.userId,
      'Phone Number':Customers.phoneNumber,
      'Email':Customers.email
    }));
  }
}



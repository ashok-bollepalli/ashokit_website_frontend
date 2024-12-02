import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDTO } from 'src/app/dto/ClientDTO';
import { ClientService } from 'src/app/services/client/client.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit{

clients: ClientDTO[] = [];

public pageSize: number = 5; 
public currentPage: number = 1; 
public totalItems: number = 0;
@Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

public title: string = '';
filteredClients: ClientDTO[] =[];

  


  constructor(
    private router: Router,
    private clientService: ClientService,
    private dataService: DataServiceService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.getAllClients();
  }

filter() {
  this.filteredClients = this.clients.filter(
    (clients: ClientDTO) => {
      return clients.title
      .toLowerCase()
      .trim()
      .includes(this.title.toLowerCase().trim());
    }
     )
     this.calculateTotalPages();
}

  addClient() {
    if (this.userStorageService.getRole() == 'SUPERADMIN') {
      this.router.navigate(['/super-admin/add-client']);
    } else {
      this.router.navigate(['/admin/add-client']);
    }
  }

getAllClients(): void {
  this.clientService.getAllClients().subscribe(
    res => {
      this.clients = res.data;
      this.filteredClients = res.data;
      this.filter();

    },
    error => {
      console.error('Error fetching social settings:', error);
    }
  );
}

updateClient(client:ClientDTO){
  this.dataService.clientData = client;
  if (this.userStorageService.getRole() == 'SUPERADMIN') {
  this.router.navigate(['/super-admin/update-client']);
} else {
  this.router.navigate(['/admin/update-client']);
}
}

calculateTotalPages() {
  if (this.filteredClients) {
    this.totalItems = this.filteredClients.length;
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
deleteClient(id: number) {
  this.clientService.deleteClient(id).subscribe((res) => {
    this.getAllClients();
    this.filter();
  });
}

}

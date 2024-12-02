import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientDTO } from 'src/app/dto/ClientDTO';
import { ClientService } from 'src/app/services/client/client.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  client!: ClientDTO;
  title: string = '';
  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService

  ) { }

  ngOnInit(): void {

    this.client = this.dataService.clientData;

  }
 
  onSubmit(): void {
    if (this.client) {
      this.clientService.updateClient(this.client).subscribe(
        (res: any) => {

          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-client']);
          } else {
            this.router.navigate(['/admin/view-client']);
          }
        });
    }
  }

}

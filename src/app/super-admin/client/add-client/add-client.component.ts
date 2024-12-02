import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client/client.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  ClientForm: FormGroup = this.formBuilder.group({});
  image: File | null = null;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.ClientForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ClientForm.valid && this.image) {
      const formData = this.ClientForm.value;
      if (this.image) {
        this.clientService.addClient(formData, this.image).subscribe(
          (res: any) => {
            this.toaster.success('Data Added Successfully');
            if (this.userStorageService.getRole() == 'SUPERADMIN') {
              this.router.navigate(['/super-admin/view-client']);
            } else {
              this.router.navigate(['/admin/view-client']);
            }
          });
      }
    }
  }
  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'image') {
        this.image = files[0];
      }
    }
  }
}
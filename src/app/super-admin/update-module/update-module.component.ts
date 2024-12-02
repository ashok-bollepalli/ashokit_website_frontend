import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleDTO } from 'src/app/dto/ModuleDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.scss']
})
export class UpdateModuleComponent implements OnInit {
  module!: ModuleDTO;

  ModuleName: string = '';

  constructor(
    private courseService: CourseServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService

  ) { }
  ngOnInit(): void {

    this.module = this.dataService.moduleData;

  }

  onSubmit(): void {
    if (this.module && this.module.moduleId) {
      this.courseService.updateModule(this.module.moduleId, this.module).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-modules']);
          } else {
            this.router.navigate(['/admin/view-modules']);
          }
        });
    }
  }


  updateModule() {
    this.router.navigate(['/super-admin/view-modules']);
  }
}



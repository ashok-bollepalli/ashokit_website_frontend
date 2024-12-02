import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubModuleDTO } from 'src/app/dto/SubModuleDTO';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { UserStorageService } from 'src/app/services/user-storage.service';


@Component({
  selector: 'app-update-sub-module',
  templateUrl: './update-sub-module.component.html',
  styleUrls: ['./update-sub-module.component.scss']
})
export class UpdateSubModuleComponent implements OnInit {

  subModule!: SubModuleDTO;

  subModuleName: string ='';

  constructor(
    private courseService: CourseServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private toaster: ToastrService,
    private userStorageService: UserStorageService
    
  ) {}
  ngOnInit(): void {

  this.subModule = this.dataService.subModuleData;

  }

  onSubmit(): void {
    if (this.subModule) {
      this.courseService.updateCourseSubModule(this.subModule).subscribe(
        (res: any) => {
          this.toaster.success('Data Updated Successfully');
          if (this.userStorageService.getRole() == 'SUPERADMIN') {
            this.router.navigate(['/super-admin/view-sub-module']);
          } else {
            this.router.navigate(['/admin/view-sub-module']);
          }
        });
    }
  }


updateCourseSubModule() {
    this.router.navigate(['/super-admin/view-sub-module']);
  }
}

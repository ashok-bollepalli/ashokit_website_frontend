import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialSettingsDTO } from 'src/app/dto/SocialSettingsDTO';
import { SocialSettingsService } from 'src/app/services/social-settings.service';

@Component({
  selector: 'app-add-socialsettings',
  templateUrl: './add-socialsettings.component.html',
  styleUrls: ['./add-socialsettings.component.scss']
})
export class AddSocialsettingsComponent implements OnInit{

public socialSettingsForm: FormGroup = this.formBuilder.group({});
public socialSettins!: SocialSettingsDTO ;

   constructor(
    private socialSettingsService: SocialSettingsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
    ) {}
    
    ngOnInit(): void {
     this.socialSettingsService.getAllSocialSettings().subscribe(res =>{
         this.socialSettins = res.data[0];
     });

      this.socialSettingsForm = this.formBuilder.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
        link: ['', Validators.required],
        status: ['']

      });
    }

    onSubmit(): void {
      console.log('form-Data', this.socialSettingsForm);
      if (this.socialSettingsForm.valid) {
        const formData = this.socialSettingsForm.value;
        this.socialSettingsService.addSocialSettings(formData).subscribe(
          (res: any) => {
            this.toaster.success('Data Added Successfully');
            this.router.navigate(['/super-admin/social-settings']);
          },
          (error) => {
            console.error("Error:", error);
          }
        );
      } else {
       
      }
    }
    
    


}

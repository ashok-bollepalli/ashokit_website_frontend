import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';

@Component({
  selector: 'app-seo-settings',
  templateUrl: './seo-settings.component.html',
  styleUrls: ['./seo-settings.component.scss']
})
export class SeoSettingsComponent implements OnInit {

  public Editor = ClassicEditor;
  googleSeoFormSubmitForm: FormGroup = this.formBuilder.group({});
  webSiteMetaKeywordsForm: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder,
    private generalSettingsService: GeneralSettingsService
  ) { }

  ngOnInit(): void {
    this.googleSeoFormSubmitForm = this.formBuilder.group({
      analytics: ['',],
      metaKeyword: ['Google Analytics'],
      metaTitle: ['Google Analytics'],
      metaDescription: ['Google Analytics'],
      status:['Active']
    })

    this.webSiteMetaKeywordsForm = this.formBuilder.group({
      analytics: ['Website Meta Keywords',],
      metaKeyword: [''],
      metaTitle: ['Website Meta Keywords'],
      metaDescription: ['Website Meta Keywords'],
      status:['Active']
    })
  }
  googleSeoFormSubmit(): void {
      console.log('Form Submitted');
    if (this.googleSeoFormSubmitForm.valid) {
      const seoAnalyticsData = this.googleSeoFormSubmitForm.value;
      this.generalSettingsService.createSeoAnalytics(seoAnalyticsData).subscribe(res => {
      })
  
    }

  }

  webSiteMetaKeywordsFormSubmit(): void {
    console.log('Form Submitted');
  if (this.webSiteMetaKeywordsForm.valid) {
    const seoAnalyticsData = this.webSiteMetaKeywordsForm.value;
    this.generalSettingsService.createSeoAnalytics(seoAnalyticsData).subscribe(res => {
    })

  }

}
}
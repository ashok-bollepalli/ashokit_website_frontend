import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit{

  ngOnInit(): void {
    this.setMetaTags();
  }

  constructor( private meta: Meta, private titleService: Title){

  }


  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Java Course in Hyderabad | Master Java with Expert Training');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Enroll in the best Java course in Hyderabad and gain expertise in Java programming. Our course offers comprehensive training from basics to advanced concepts, hands-on projects, and job placement assistance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Java Course Hyderabad, Java Programming Training, Java Classes Hyderabad, Learn Java in Hyderabad, Java Certification Course, Java Programming Course Hyderabad, Best Java Course Hyderabad' });
  }


  

}

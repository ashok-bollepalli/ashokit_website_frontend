import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {


  ngOnInit(): void {
    this.setMetaTags();
  }


  constructor( private meta: Meta, private titleService: Title) {

  }

  setMetaTags() {
    // Set the title
    this.titleService.setTitle('Best Software Training Institute in Hyderabad | Ashok IT');

    // Set meta description
    this.meta.updateTag({ name: 'description', content: 'Discover the best software training institute in Hyderabad at Ashok IT. Offering comprehensive courses in Java, Python, AWS, DevOps, and more. Get industry-ready with hands-on training and expert guidance.' });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: 'Best Software Training Institute, Hyderabad, IT Courses, Full Stack Development, Java, Python, AWS, DevOps, Ashok IT' });
  }

  scrollUp(targetDiv: string) {
    setTimeout(() => {
      document.getElementById(targetDiv)?.scrollIntoView({
        behavior: 'smooth'
      });
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../services/course-service.service';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseDTO } from '../dto/CourseDTO';
import { DataServiceService } from '../services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { ModuleDTO } from '../dto/ModuleDTO';
import { SubModuleDTO } from '../dto/SubModuleDTO';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  public course: any = {};
  public courses: CourseDTO[] = [];
  public courseUrl!: string | null;
  public modules: ModuleDTO[] = [];
  public moduleId: number = 1;
  public courseId: number = 1;
  public selectedModules: any[] = [];
  public subModuleName: string = '';
  public activeTab: string = 'All';
  public subModules: SubModuleDTO[] = [];


  constructor(
    private courseService: CourseServiceService,
    private dataLoaderService: DataLoaderService,
    private dataServiceService: DataServiceService,
    private meta: Meta, private titleService: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.courseUrl = params.get('courseUrl');
      this.getAllCourses();
      // this.getAllCourseModules();     
      //this.getAllSubModules();
      // this.getAllSubModuleByModule('All');
      this.selectedModules = this.modules;
    });


  }
  getAllCourses() {
    this.dataLoaderService.getAllCourses().subscribe(
      res => {
        this.courses = res.data;;
        this.course = this.courses.find(c => c.courseUrl === this.courseUrl);
        this.setMetaTags(this.course);
        this.courseId = this.course.courseId;
        this.getModulesWithCourseId(this.course.courseId);
      },
      error => {
        console.error('Error fetching course:', error);
      }
    );
  }

  
  setMetaTags(course: any) {
    // Set the title
    this.titleService.setTitle(course.metaTitle);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: course.metaDescription });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: course.metaKeywords });
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((x, i) => i);
  }



  getAllCourseModules() {
    this.dataLoaderService.getAllCourseModules().subscribe(
      res => {
        this.modules = res.data;
        // this.selectedModules = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getModulesWithCourseId(courseId: any) {
    this.dataLoaderService.getModulesByCourseId(courseId).subscribe(
      res => {
        this.modules = res.data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  getAllSubModuleByModule(module: any) {
    this.dataLoaderService.getAllSubModuleByModule(module.moduleId).subscribe((res) => {
      this.subModules = res.data;
    });
    this.selectTab(module.moduleName);
  }
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  showFile(course: any): void {
    const fileUrl = `../../../assets/uploads/course/${course.courseContent}`;

    // Open a new window
    const newWindow = window.open('', '_blank');

    if (newWindow) {
      // Create the HTML content for the new window
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
         <title>Ashok IT :: Best Software Training Institute in Hyderabad</title>
            <style>
                body { margin: 0; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
        </head>
        <body>
            <iframe src="${fileUrl}"></iframe>
        </body>
        </html>
      `);

      // Close the document to finish writing
      newWindow.document.close();
    }
  }

  // getAllSubModules() {
  //   this.dataLoaderService.getAllSubModules().subscribe(
  //     (res: any) => {
  //       this.subModules = res.data;

  //       // this.filter();
  //     },
  //     (error) => {

  //     }
  //   );
  // }
}

import { Component } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { CourseDTO } from '../dto/CourseDTO';
import { Route, Router } from '@angular/router';
import { BannerDTO } from '../dto/BannerDTO';
import { DataSharingService } from '../services/sharing/data-sharing.service';
import { ClientDTO } from '../dto/ClientDTO';
import { TestimonialDTO } from '../dto/TestimonialDTO';
import { DataServiceService } from '../services/data-service.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  url1: string =
    '../../assets/images/spring-boot-microservices-online-training.jpeg';
  url2: string =
    '../../assets/images/java-realtime-project-online-training.png';
  url3: string =
    '../../assets/images/java-fullstack-development-online-training.jpeg';
  url4: string = '../../assets/images/devops-with-aws-online-training.jpeg';


  pageTitle: string = '';
  pageDescription: string = '';
  pageKeywords: string = '';

  course!: CourseDTO;
  public courses: CourseDTO[] = [];
  public banners: BannerDTO[] = [];
  public isChatBoxEnable: boolean = false;
  public clients: ClientDTO[] = [];
  chunkedClients: ClientDTO[][] = [];
  chunkedTestimonials: TestimonialDTO[][] = [];
  public testimonials: TestimonialDTO[] = [];

  setDefaultClients() {
    this.clients = [
      {
        id: 1,
        image: '../../assets/images/partner6.png',
        title: 'IBM',
      },
      {
        id: 2,
        image: '../../assets/images/partner7.png',
        title: 'Tech Mahindra',
      },
      {
        id: 3,
        image: '../../assets/images/partner8.png',
        title: 'Wipro',
      },
      {
        id: 4,
        image: '../../assets/images/partner9.png',
        title: 'State Streets',
      },
      {
        id: 5,
        image: '../../assets/images/tcs.png',
        title: 'TCS',
      },
      {
        id: 6,
        image: '../../assets/images/infosys.png',
        title: 'Infosys',
      },
      {
        id: 7,
        image: '../../assets/images/hcl.png',
        title: 'HCL',
      },
      {
        id: 8,
        image: '../../assets/images/congnizant.png',
        title: 'Congnizant',
      },
    ];
    this.chunkClients();
  }

  setDefaultTestimonials() {
    this.testimonials = [
      {
        id: 1,
        name: 'Preethi',
        image: '../../assets/mockInterviews/developer_Preethi.jpg',
        designation: 'Fullstack Developer',
        description:
          '“I am a full-time employee at an IT solutions company. I took multiple online IT training courses. The course material was thorough and impressive. The teachers are also very supportive. I was easily able to update my skills concurrently with my job. Thank you Ashok IT expert teaching team for all your support and guidance.”',
        role: '',
        star: '5',
        status: 'Active',
        message: '',
      },
      {
        id: 2,
        name: 'Shiva Krishna',
        image: '../../assets/testimonial/Shiva Photo.jpg',
        designation: 'DevOps Engineer',
        description:
          '“I consider my experience at Ashok IT to be incredibly important in my growth as a competent professional. During my time at Ashok IT, I had the opportunity to learn through both books and practice and develop a large variety of essential technical skills. Thank you Ashok IT .”',
        role: '',
        star: '5',
        status: 'Active',
        message: '',
      },
      {
        id: 3,
        name: 'Soumya',
        image: '../../assets/mockInterviews/developer_soumya.jpg',
        designation: 'Java Developer',
        description:
          '“I have completed multiple certification courses from Ashok IT including Java, cloud computing, and data structures and algorithm. I was greatly impressed by the commendable teaching methodologies and experienced and insightful tutors who were able to simplify the process of learning various complex technologies.”',
        role: '',
        star: '5',
        status: 'Active',
        message: '',
      },
    ];
    this.chunkTestimonials();
  }

  setDefaultBanners() {
    this.banners = [
      {
        id: 1,
        title: 'Java',
        subTitle: '',
        coverImage: '../../assets/banners/banner01.jpg',
        url: '',
        status: 1,
      },
      {
        id: 2,
        title: 'Springboot Micro Services',
        subTitle: '',
        coverImage: '../../assets/banners/banner04.jpg',
        url: '',
        status: 1,
      },
      {
        id: 3,
        title: 'Java Real Time Project',
        subTitle: '',
        coverImage: '../../assets/banners/banner02.jpg',
        url: '',
        status: 1,
      },
      {
        id: 4,
        title: 'DevOps',
        subTitle: '',
        coverImage: '../../assets/banners/banner03.jpg',
        url: '',
        status: 1,
      },
    ];
  }

  cards = [
    {
      title: 'In-time Course Completion',
      description:
        'Our courses are strategically and innovatively designed, blending both theoretical and practical teaching methods. The modules are carefully chosen to ensure the course is as industry-relevant as possible. The courses are concise yet thorough and students can kick start their careers at the earliest possible.',
      iconColor: '#007bff',
      isExpanded: false,
      icon: 'fa-calendar-check',
    },
    {
      title: 'State-of-the-art Infrastructure',
      description:
        'At Ashok IT, students study in a learning environment supported by state-of-the-art infrastructure, new and innovative teaching techniques, and high-end technological educational resources.',
      iconColor: '#28a745',
      isExpanded: false,
      icon: 'fa-building',
    },
    {
      title: 'Blended Training Approach',
      description:
        'We adopt an integrated approach to training that helps our students get both the IT knowledge and skills required to handle the challenging corporate responsibilities. Theoretical learning at Ashok IT is adequately complemented by practice-based heuristic learning that allows our students to learn in an industry-specific way.',
      iconColor: '#dc3545',
      isExpanded: false,
      icon: 'fa-sync',
    },
    {
      title: 'Free Demo Sessions',
      description:
        'We also provide our prospective students with the option to try the various programs and courses that we offer through our free demo service. Using this service students can test the course quality and get a better understanding of what course they want to study.',
      iconColor: '#ffc107',
      isExpanded: false,
      icon: 'fa-handshake',
    },
  ];

  toggleCard(card: any) {
    card.isExpanded = !card.isExpanded;
  }

  isTextOverflowed(text: string): boolean {
    const element = document.createElement('div');
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.whiteSpace = 'nowrap';
    element.style.width = '100px'; // Match the width of the card's text area
    element.innerText = text;
    document.body.appendChild(element);
    const isOverflowed = element.scrollWidth > element.clientWidth;
    document.body.removeChild(element);
    return isOverflowed;
  }

  constructor(
    private dataSharingService: DataSharingService,
    private dataLoaderService: DataLoaderService,
    private router: Router,
    private dataServiceService: DataServiceService,
    private meta: Meta, private titleService: Title
  ) { }
  ngOnInit(): void {
    this.setMetaTags();
    this.getAllCourses();
    this.getAllBanners();
    this.getAllClients();
    this.getAllTestimonials();

  }
  getAllCourses(): void {
    this.dataLoaderService.getTreandingCourses().subscribe(
      (res) => {
        this.courses = res.data;
      },
      (error) => {
        console.error('Error fetching course:', error);
      }
    );
  }
  edit(course: CourseDTO) {
    this.dataLoaderService.courseData = course;
    //  this.router.navigate(['/view-details']);
    this.router.navigate([`/courses/${course.courseUrl}`]);
  }

  getAllBanners() {
    this.dataLoaderService.getAllBanners().subscribe(
      (res: any) => {
        if (res.data && res.data.length > 0) {
          this.banners = res.data;
        } else {
          this.setDefaultBanners();
        }
      },
      (error) => {
        console.log('Error fetching banners: ', error);
        this.setDefaultBanners();
      }
    );
  }

  logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';

  handleError() {
    this.logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';
  }

  messageUs() {
    this.isChatBoxEnable = true;
  }

  closePopup() {
    console.log('Closing chatbox...');
    this.isChatBoxEnable = false;
    console.log('Chatbox closed:', this.isChatBoxEnable);
  }

  scrollTo(identification: string) {
    this.dataSharingService.scrollTo(identification);
  }

  getAllClients(): void {
    this.dataLoaderService.getAllClients().subscribe(
      (res: any) => {
        if (res.data && res.data.length > 0) {
          this.clients = res.data;
          this.chunkClients();
        } else {
          this.setDefaultClients();
        }
      },
      (error) => {
        console.log('Error fetching clients: ', error);
        this.setDefaultClients();
      }
    );
  }

  getAllTestimonials() {
    this.dataLoaderService.getAllTestimonials().subscribe(
      (res: any) => {
        if (res.data && res.data.length > 0) {
          this.testimonials = res.data;
          this.chunkTestimonials();
        } else {
          this.setDefaultTestimonials();
        }
      },
      (error) => {
        console.log('Error fetching testimonials: ', error);
        this.setDefaultTestimonials();
      }
    );
  }

  chunkClients(): void {
    const chunkSize = 4;
    this.chunkedClients = [];
    for (let i = 0; i < this.clients.length; i += chunkSize) {
      this.chunkedClients.push(this.clients.slice(i, i + chunkSize));
    }
  }
  chunkTestimonials() {
    const chunkSize = 3;
    for (let i = 0; i < this.testimonials.length; i += chunkSize) {
      this.chunkedTestimonials.push(this.testimonials.slice(i, i + chunkSize));
    }
  }


  setMetaTags() {
    this.pageTitle = 'Ashok IT : Best Software Training Institute | Full Stack Development & IT Courses';
    this.pageDescription = 'Join Ashok IT, a leading software training institute offering expert-led courses in Java, Python, AWS, DevOps, and more. Enhance your career with real-time projects, job assistance, and hands-on experience.';
    this.pageKeywords = 'Software Training Institute, Full Stack Development, Java Course, Python Training, AWS Certification, DevOps Course, IT Training, Job Placement, Real-Time Projects';

    // Set the title
    this.titleService.setTitle(this.pageTitle);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: this.pageDescription });

    // Set meta keywords
    this.meta.updateTag({ name: 'keywords', content: this.pageKeywords });
  }

}

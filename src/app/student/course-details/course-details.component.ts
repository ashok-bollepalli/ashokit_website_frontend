import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDTO } from 'src/app/dto/CourseDTO';
import { CoursePaymentDetailsDTO } from 'src/app/dto/CoursePaymentDetailsDTO';
import { PaymentSettingsDTO } from 'src/app/dto/PaymentSettingsDTO';
import { StudentDTO } from 'src/app/dto/StudentDTO';
import { StudentPaymentDTO } from 'src/app/dto/StudentPaymentDTO';
import { CoursePaymentService } from 'src/app/services/coursepayment/course-payment.service';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { PaymentSettingsService } from 'src/app/services/payment-settings.service';
import { StudentComplaintsService } from 'src/app/services/student-complaints.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course!: CourseDTO;
  batchId!: number;
  coursePaymentDetailsDTO!: CoursePaymentDetailsDTO;
  courseForm!: FormGroup;
  backVideosValue: string = 'Yes';
  razorpayInstance: any;
  socialUser!: SocialUser | null;
  student!: StudentDTO;
  studentPayment!: StudentPaymentDTO;
  paymentSettings: PaymentSettingsDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursePaymentService: CoursePaymentService,
    private fb: FormBuilder,
    private userStorageService: UserStorageService,
    private paymentSettingsService: PaymentSettingsService,
    private router: Router,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.dataLoaderService.getAllPaymentSettings().subscribe(
      res => {
        this.paymentSettings = res.data;
      }
    );


    this.socialUser = this.userStorageService.getSocialUser();
    this.route.params.subscribe((params) => {
      this.batchId = +params['batchId'];
      const pp = this.route.snapshot.params;
      this.getCourseDetails(this.batchId);
    });

    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseMode: ['', Validators.required],
      trainerName: ['', Validators.required],
      courseOfferFee: [0, Validators.required],
      backVideos: ['Yes', Validators.required],
      backupVideosFee: [0, Validators.required],
      gstPercentage: ['', Validators.required],
      totalAmount: [0, Validators.required],
    });
  }

  getCourseDetails(batchId: number): void {
    this.coursePaymentService
      .getBatchPaymentDetails(this.batchId)
      .subscribe((res) => {
        this.coursePaymentDetailsDTO = res.data;
        this.courseForm.patchValue(this.coursePaymentDetailsDTO);
      });
  }

  onBackupVideosChange(): void {
    const backVideosControl = this.courseForm.get('backVideos');
    const backupVideosFeeControl = this.courseForm.get('backupVideosFee');
    const totalAmountControl = this.courseForm.get('totalAmount');

    if (backVideosControl && backupVideosFeeControl && totalAmountControl) {
      const hasBackupVideos = backVideosControl.value === 'Yes';
      const backupVideosFee = backupVideosFeeControl.value;
      let courseOfferFee = this.coursePaymentDetailsDTO.courseOfferFee;

      // Calculate total amount based on selection
      let totalAmount = hasBackupVideos
        ? courseOfferFee + backupVideosFee
        : courseOfferFee;
      totalAmountControl.setValue(totalAmount);
    }
  }
  async onSubmit(): Promise<void> {

    if (this.courseForm.valid) {
      let paymentSetting = this.paymentSettings[0];
      let studentEmail = this.socialUser?.email;
      if (!studentEmail) {
        studentEmail = this.userStorageService.getStudent().studentEmail;
      }
      if (studentEmail) {
        try {
          this.student = await this.addStudentEnrollment(studentEmail);
          this.studentPayment = await this.addStudentPayment(this.student);
          const totalAmount = this.courseForm.get('totalAmount')?.value;
          if (this.student && this.studentPayment && totalAmount > 0) {
            let razorpayOptions: any = {
              key: paymentSetting.keyId,
              amount: totalAmount * 100,
              currency: paymentSetting.displayCurrency,
              name: 'Ashok IT',
              description: 'Course Payment',
              image: paymentSetting.image,
              handler: this.paymentHandler.bind(this),
              modal: {
                ondismiss: function () {
                  console.log('Checkout form closed by user');
                },
              },
              prefill: {
                name: this.socialUser?.firstName + ' ' + this.socialUser?.lastName,
                email: studentEmail,              
                failure: this.paymentFailureHandler.bind(this),
              },

              notes: {
                address: 'Hyderabad ',
              },
              theme: {
                color: paymentSetting.color,
              },
            };
            const rzp = new (window as any).Razorpay(razorpayOptions);
            rzp.open();
          } else {
            this.router.navigate(['/student/enrollment-success']);
          }
        } catch (error) {
          console.error(
            'Error in student enrollment or payment process',
            error
          );
        }
      }
    }
  }

  paymentHandler(response: any) {
    this.coursePaymentService
      .updateStudentPayment(this.studentPayment.paymentId, response?.razorpay_payment_id, 'Active')
      .subscribe((res) => {
        console.log(res.data);
        this.router.navigate(['/student/enrollment-success']);
      });
  }
  paymentFailureHandler(error: any) {
    console.error('Payment failed:', error);
  }

  async addStudentEnrollment(studentEmail: string): Promise<StudentDTO> {
    try {
      const courseName = this.courseForm.get('courseName')?.value;
      const courseMode = this.courseForm.get('courseMode')?.value;
      const trainerName = this.courseForm.get('trainerName')?.value;
      const courseFee = this.courseForm.get('courseOfferFee')?.value;
      const backVideos = this.courseForm.get('backVideos')?.value;
      const backupVideosFee = this.courseForm.get('backupVideosFee')?.value;
      const gstPercentage = this.courseForm.get('gstPercentage')?.value;
      const totalAmount = this.courseForm.get('totalAmount')?.value;

      const studentResponse = await this.coursePaymentService.getStudentByStudentEmail(studentEmail).toPromise();
      let student = studentResponse.data;

      if (!student) {
        const studentObj: StudentDTO = {
          studentId: 0,
          fullName: this.socialUser ? this.socialUser.firstName : '',
          lastName: this.socialUser ? this.socialUser.lastName : '',
          gender: '',
          studentEmail: this.socialUser ? this.socialUser.email : '',
          mobileNumber: '',
          countryCode: '',
          courseStatus: 'Active',
          courseId: 0,
          amountPaid: totalAmount,
          dueAmount: 0,
          password: '',
          passwordUpdated: '',
          higherEducation: '',
          specialization: '',
          graduationYear: '',
          university: '',
          profilePhoto: this.socialUser ? this.socialUser.photoUrl : '',
          placementStatus: 'No',
          emailSubscriber: 'Yes',
          messageSubscriber: 'Yes',
          trainerId: this.coursePaymentDetailsDTO.trainerId,
          counsellorId: this.coursePaymentDetailsDTO.counsellorId,
          videosAccess: this.coursePaymentDetailsDTO.backVideos,
          classType: courseMode,
          batchId: this.coursePaymentDetailsDTO.batchId,
          companyName: '',
          salary: '',
          exp: '',
          aadhar: '',
          jobTrialsAs: '',
          linkedinProfile: '',
          lookingForJob:'',
          trainingStatus:'',
          createdDate: ''
        };

        const addedStudentResponse = await this.coursePaymentService.addStudent(studentObj).toPromise();
        student = addedStudentResponse.data;
      }

      return student;
    } catch (error) {
      console.error("Error adding student enrollment", error);
      throw error;
    }
  }

  async addStudentPayment(student: StudentDTO): Promise<StudentPaymentDTO> {
    try {
      if (student && student?.studentId) {

        const studentPaymentResponse = await this.coursePaymentService.getStudentPaymentsByCourseBatchAndStudent(
          this.coursePaymentDetailsDTO.courseId,
          this.coursePaymentDetailsDTO.batchId,
          student.studentId).toPromise();


        let studentPayment = studentPaymentResponse.data;
        const totalAmount = this.courseForm.get('totalAmount')?.value;
        const backVideos = this.courseForm.get('backVideos')?.value;

        if (!studentPayment) {

          let enrollmentStatus = 'Active';
          let followupStatus = 'NOT_REQUIRED';
          if (totalAmount > 0) {
            enrollmentStatus = "In_Active";
            followupStatus = 'Pending';
          }
          const studentPaymentDTOObj: StudentPaymentDTO = {
            paymentId: 0,
            razorpayPaymentId: '',
            paidAmount: JSON.stringify(totalAmount),
            dueAmount: '0',
            invoiceNumber: this.generateInvoiceNumber(),
            paymentMode: 'Online',
            videosAccess: backVideos,
            classType: this.coursePaymentDetailsDTO.courseMode,
            batchCode: this.coursePaymentDetailsDTO.batchCode,
            enrollmentStatus: enrollmentStatus,
            refundStatus: 'NA',
            studentName: this.socialUser ? this.socialUser.name : '',
            studentEmail: this.socialUser ? this.socialUser.email : '',
            countryCode: student.countryCode,
            wtCountryCode: student.countryCode,
            whatsappNumber: student.mobileNumber,
            phoneNumber: '',
            followupStatus: followupStatus,
            frontOfcMsg: '',
            batchType: this.coursePaymentDetailsDTO.courseMode,
            batchId: this.coursePaymentDetailsDTO.batchId,
            courseId: this.coursePaymentDetailsDTO.courseId,
            trainerId: this.coursePaymentDetailsDTO.trainerId,
            counsellorId: this.coursePaymentDetailsDTO.counsellorId,
            studentId: student.studentId
          };

          const addedPaymentResponse = await this.coursePaymentService.addStudentPayment(studentPaymentDTOObj).toPromise();
          return addedPaymentResponse.data;
        }
        return studentPayment;
      }
      throw new Error('Invalid student details');
    } catch (error) {
      console.error("Error adding student payment", error);
      throw error;
    }
  }

  generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = `${year}${month}${day}-${randomNum}`;
    return invoiceNumber;
  }
}

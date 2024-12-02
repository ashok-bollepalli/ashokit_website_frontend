import { Timestamp } from "rxjs";

export interface StudentDTO {
      studentId:number;
      fullName: string;
      lastName: string;
      gender: string;
      studentEmail: string;
      mobileNumber: string;
      countryCode: string;
      courseStatus: string;
      courseId:number;
      amountPaid:number;
      dueAmount:number;
      password: string;
      passwordUpdated: string;
      higherEducation: string;
      specialization: string;
      graduationYear: string;
      university: string;
      profilePhoto: string;
      placementStatus: string;
      emailSubscriber: string;
      messageSubscriber: string;
      trainerId:number;
      counsellorId:number;
      videosAccess: string;
      classType: string;
      batchId:number;
      companyName: string;
      salary: string;
      exp:string;
      aadhar: string;
      lookingForJob: string;
      jobTrialsAs: string;
      trainingStatus: string;
      linkedinProfile: string;      
      createdDate: string
}
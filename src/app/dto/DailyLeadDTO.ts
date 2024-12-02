

export interface DailyLeadDTO {
  
    leadId: number;
    name: string;
    email: string;
    phoneNumber: string;
    gender:string;
    leadStatus: string;
    trainingMode: string;
    comments: string;
    counsellorId:number;
    courseCategoryId:number
    courseId:number;
    createdDate:Date;
	createdBy: string;
    msg:string;

}
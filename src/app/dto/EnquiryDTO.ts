export interface EnquiryDTO {
    id:number;
    fullName:string;
    webinarName:string;
    email: string;
    mobilNumber: number;
    wtCountryCode: number;
    whatsappNumber:number;
    message: string;
    comment:string;
    city: string;
    trainingMode: string;
    remark:string;
    status:string;
    paymentStatus:string;
    categoryId: number;
    counsellorId: number;
    trainerId:number;
    courseId:number;
    createdAt: number;
    createdBy : string;
    updatedAt: number;
    updatedBy: string;
    courseCategoryId: number;
    enqSource: string;

}
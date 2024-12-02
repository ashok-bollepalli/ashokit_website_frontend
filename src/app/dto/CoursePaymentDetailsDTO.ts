export interface CoursePaymentDetailsDTO {
    studentEmail: string,
    phone: number,
    courseName : string,
    courseMode: string,
    courseFee: number,
    courseOfferFee: number,
    backupVideosFee: number,
    trainerName: string,
    backVideos: string,
    gstPercentage: string,
    totalAmount: number,
    batchId: number;
    courseId: number;
    trainerId: number;
    counsellorId: number;
    courseCategoryId: number;
    batchCode : string;

}
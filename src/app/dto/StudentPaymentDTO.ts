export interface StudentPaymentDTO {
    paymentId : number;
    razorpayPaymentId : string;
    paidAmount: string;
    dueAmount: string;
    invoiceNumber: string;
    paymentMode: string;
    videosAccess: string;
    classType: string;
    batchCode: string;
    enrollmentStatus: string;
    refundStatus: string;
    studentName: string;
    studentEmail: string;
    countryCode: string;
    wtCountryCode: string;
    whatsappNumber: string;
    phoneNumber: string;
    followupStatus: string;
    frontOfcMsg: string;
    batchType: string;
    batchId: number;
    courseId: number;
    trainerId: number;
    counsellorId: number;
    studentId: number;
}
export interface ScheduleBatchDTO {
      id:number; 
      courseName: string;
      trainer: string;
      counsellor: string;
      scheduleName: string;
      coursePrice: number;
      offerPrice: number;
      scheduleType:string;
      image:string;
      batchCode:string;
      backupVideos:string;
      backupVideosFee:number;
      batchTimings:string;
      meridianType: string;
      startDate:Date;
      endDate:Date;
      duration:number;
      zoomId:string;
      whatsappLink:string;
      gitLink:string;
      zoomRegLink:string;
      teachableCourseId:string;
      labelName:string;
      courseStatus:string;
      demoStatus:string;
      courseCategoryId:number;
      courseId:number;
      trainerId:number;
      counsellorId:number;
      clsrmTrngAvailable:string;
  
}
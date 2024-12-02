

export interface EventDTO {
  eventId: number;
  eventName: string;
  eventDesc: string;
  eventBenefits: string;
  eventCategory: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  eventVenue: string;
  eventHost: string;
  eventStatus: number;
  eventThumbnail: string;
  eventBanner: string;
  activeSw: number;
  trainerId: number;
  eventCategoryId: number;
  startMeridianType: string;
  endMeridianType:string;
  eventSlug:string;
  registeredCount: number;
  eventRegLink: string;
  eventClassStatus: string;
}
export interface JobApplicationDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    position: string
    qualification: string;
    resume: string
    userComment: string;
    createdAt:Date;
}
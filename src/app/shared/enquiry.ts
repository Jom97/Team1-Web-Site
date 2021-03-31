import { Course } from "./course";
import { Status } from "./status";

export class Enquiry {

    public enquiryId!: number;
    public name!: string;
    public dob!: Date;
    public email!: string;
    public highestQual!: string;
    public enqDate!: Date;
    public status!: Status;
    public enquiredCourses: Course[] = [];
    
}

import { Module } from "./module";
import { Qualification } from "./qualification";

export class Course {

    public courseId!: number;
    public courseName!: string;
    public description!: string;
    public durationDays!: number;
    public fees!: number;
    public active!: boolean;
    public modules: Module[] = [];
    public quals: Qualification[] = [];

    constructor();
    constructor(id:number);
    constructor(id?: any) {
        this.courseId = id;
    }
    
}


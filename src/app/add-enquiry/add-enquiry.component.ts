import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import { Enquiry } from '../shared/enquiry';
import { EnquiryService } from '../shared/enquiry.service';
import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.scss']
})
export class AddEnquiryComponent implements OnInit {

  enquiry: Enquiry = new Enquiry;
  enquiries: Enquiry[] = [];

  addForm!: FormGroup;
  statuses: Status[] = [];
  allCourses: Course[] = [];

  isSubmitted = false;
  // error = '';

  constructor(
    private enquiryService: EnquiryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private statusService: StatusService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllEnquiries();
    this.getAllStatus();
    this.getAllCourses();
    this.newAddForm();
  }

  get formControls() {
    return this.addForm.controls;
  }

  //Add form
  newAddForm() {

    this.addForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(20)]],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        highestQual: ['', [Validators.required, Validators.maxLength(20)]],
        enquiredCourses: this.fb.array([]),
      }
    );
  }

  //Get all Status
  getAllStatus() {
    this.statusService.getAllStatuses().subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  //Get All Enquiries
  getAllEnquiries() {
    this.enquiryService.getAllEnquiries().subscribe(
      response => {
        this.enquiries = response;
      }
    )
  }


  // Getting all Courses
  getAllCourses() {

    this.courseService.getAllCourses().subscribe( //active courses
      response => {
        this.allCourses = response;
        this.pushCourses();
      }
    )
  }

  //Get courses
  get courses() {
    return this.addForm.get('enquiredCourses') as FormArray;
  }

  //Push Courses
  pushCourses() {
    this.allCourses.forEach(
      element => {
        this.courses.push(this.fb.control(''));
      });

  }


  //New Enquiry Form

  //Submit Enquiry - Form
  onSubmit() {
    this.isSubmitted = true;

    if (this.addForm.invalid) {
      // this.error = "Invalid";
      return;
    }

    if (this.addForm.valid) {

      let enquiry: Enquiry = new Enquiry();
      let date: Date = new Date();

      enquiry.name = this.addForm.value['name'];
      enquiry.dob = this.addForm.value['dob'];
      enquiry.email = this.addForm.value['email'];
      enquiry.highestQual = this.addForm.value['highestQual'];
      enquiry.enqDate = date;
      enquiry.status = new Status(1);

      this.addForm.value['enquiredCourses'].forEach((element: boolean, i: number) => {
        if (element === true) {
          enquiry.enquiredCourses.push(new Course(i + 1));
        }

      });

      //Call Service for insert
      this.enquiryService.insertEnquiry(enquiry).subscribe(
        (result) => {
          this.addForm.reset();
          this.isSubmitted = false;
          this.ngOnInit();
          this.toastr.success('Added Enquiry Successfully', 'CRM App');


        }, (error) => {
          this.toastr.error('Failed to add Enquiry', 'CRM App')
        }
      )
    }
  }



}

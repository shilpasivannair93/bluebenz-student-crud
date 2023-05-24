import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList!: any[];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe(data => {
      this.studentList = data;
    }, error => {
      console.error(error);
    });
  }

  deleteFormData(id: number) {
    this.studentService.deleteStudent(id).subscribe(response => {
      console.log(response);
      this.getStudentList();
    }, error => {
      console.error(error);
    });
  }

  viewFormData(id: number) {
    this.router.navigateByUrl(`details/${id}`);
  }

  redirectToAddPage() {
    this.router.navigateByUrl(`add`);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      stream: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.studentService.addStudent(formData).subscribe(response => {
        this.router.navigateByUrl('list')
        this.myForm.reset();
      }, error => {
        console.error(error);
      });
    }
  }

  goToStudentList() {
    this.router.navigateByUrl('list')
  }
}



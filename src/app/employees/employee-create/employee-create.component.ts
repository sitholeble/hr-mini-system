import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../shared/models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent {

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYEE', Validators.required],
      department: [''],
      position: ['']
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: User = this.employeeForm.value;

      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: () => {
          alert('Employee created successfully!');
        this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          console.error('Error creating employee:', err);
          alert('Failed to create employee. Please try again.');
        }
      });
    }
  }
}

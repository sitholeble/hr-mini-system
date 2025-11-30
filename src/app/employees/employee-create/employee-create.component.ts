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
  error: string | null = null;
  loading = false;

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
      this.error = null;
      this.loading = true;
      
      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (err: any) => {
          this.loading = false;
          console.error('Error creating employee:', err);
          
          // Extract detailed error message
          let errorMessage = 'Failed to create employee. ';
          
          if (err.status === 0) {
            errorMessage += 'Cannot connect to the server. Please ensure the backend is running on http://localhost:8080';
          } else if (err.status === 400) {
            errorMessage += err.error?.message || 'Invalid data provided. Please check your input.';
          } else if (err.status === 409) {
            errorMessage += 'An employee with this email already exists.';
          } else if (err.status === 500) {
            errorMessage += 'Server error. Please try again later.';
          } else if (err.error?.message) {
            errorMessage += err.error.message;
          } else if (err.message) {
            errorMessage += err.message;
          } else {
            errorMessage += 'Please try again.';
          }
          
          this.error = errorMessage;
        }
      });
    }
  }
}

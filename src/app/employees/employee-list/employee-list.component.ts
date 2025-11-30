import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.error = null;
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.error = 'Failed to load employees. Please try again.';
        this.loading = false;
      }
    });
  }
}

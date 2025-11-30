import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', loadComponent: () => import('./employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
  { path: 'employees/create', component: EmployeeCreateComponent },
  { path: '**', redirectTo: '/employees' }
];

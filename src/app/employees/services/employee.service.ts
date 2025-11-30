import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  createEmployee(employee: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, employee);
  }

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<User> { 
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employee: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

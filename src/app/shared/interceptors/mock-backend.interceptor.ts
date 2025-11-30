import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

// In-memory storage for mock data
let mockEmployees: any[] = [
  {
    id: 1,
    firstName: 'Ble',
    lastName: 'Sit',
    email: 'ble.sit@example.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    position: 'Software Developer'
  },
  {
    id: 2,
    firstName: 'Marvelous',
    lastName: 'Moyo',
    email: 'mav.moyo@example.com',
    role: 'HR',
    department: 'Human Resources',
    position: 'HR Manager'
  }
];

let nextId = 3;

export const mockBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // Only intercept if mock mode is enabled
  if (!environment.mockBackend) {
    return next(req);
  }

  const { method, url, body } = req;
  
  // Parse the URL to get the endpoint
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  
  // Mock API endpoints
  if (path.includes('/api/employees')) {
    // Handle GET /api/employees/:id
    if (method === 'GET' && path.match(/\/api\/employees\/\d+$/)) {
      const id = parseInt(path.split('/').pop() || '0');
      const employee = mockEmployees.find(e => e.id === id);
      
      if (employee) {
        return of(new HttpResponse({
          status: 200,
          body: employee
        })).pipe(delay(500));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { message: 'Employee not found' }
        })).pipe(delay(500));
      }
    }
    
    if (method === 'GET') {
      // Get all employees
      return of(new HttpResponse({
        status: 200,
        body: [...mockEmployees]
      })).pipe(delay(500)); // Simulate network delay
    }
    
    if (method === 'POST') {
      // Create new employee
      const newEmployee = {
        ...body,
        id: nextId++
      };
      mockEmployees.push(newEmployee);
      
      return of(new HttpResponse({
        status: 201,
        body: newEmployee
      })).pipe(delay(500));
    }
    
    // Handle PUT /api/employees/:id
    if (method === 'PUT') {
      const id = body.id;
      const index = mockEmployees.findIndex(e => e.id === id);
      
      if (index !== -1) {
        mockEmployees[index] = { ...body };
        return of(new HttpResponse({
          status: 200,
          body: mockEmployees[index]
        })).pipe(delay(500));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { message: 'Employee not found' }
        })).pipe(delay(500));
      }
    }
    
    // Handle DELETE /api/employees/:id
    if (method === 'DELETE') {
      const id = parseInt(path.split('/').pop() || '0');
      const index = mockEmployees.findIndex(e => e.id === id);
      
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        return of(new HttpResponse({
          status: 204,
          body: null
        })).pipe(delay(500));
      } else {
        return of(new HttpResponse({
          status: 404,
          body: { message: 'Employee not found' }
        })).pipe(delay(500));
      }
    }
  }
  
  // If no match, pass through to real backend
  return next(req);
};


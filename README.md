# HrMiniSystem

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Prerequisites

- Node.js and npm installed

## Mock Backend Mode 🎭

**Good news!** This application includes a **mock backend** feature, so you can develop and test the frontend without needing a real backend server.

### Using Mock Backend

The application is **currently configured to use a mock backend** by default. This means:
- You can use all features immediately without setting up a backend
- Data is stored in-memory (will reset on page refresh)
- All API endpoints are simulated with realistic delays
- You'll see a yellow banner at the top indicating mock mode

To enable/disable mock mode, edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  mockBackend: true  
};
```

**Note**: Mock backend data is stored in memory and will be lost when you refresh the page. When you're ready to connect to a real backend, set `mockBackend: false`.

## Real Backend Setup

When you're ready to connect to a real backend API server, the application is configured to connect to:

- **API URL**: `http://localhost:8080/api`

### To configure a different API URL:

Edit the environment file: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://your-backend-url:port/api'
};
```

### Expected API Endpoints:

The frontend expects the following endpoints:

- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Employee Data Model:

The backend should accept and return employee data in this format:

```typescript
{
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
  department?: string;
  position?: string;
}
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

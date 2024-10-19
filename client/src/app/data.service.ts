import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serviceUrl = 'http://localhost:5000/services';
  private projectUrl = 'http://localhost:5000/projects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getServices(): Observable<any> {
    return this.http.get(this.serviceUrl);
  }

  addService(service: any): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.post(this.serviceUrl, service);
    }
    return new Observable();
  }

  updateService(id: string, service: any): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.put(`${this.serviceUrl}/${id}`, service);
    }
    return new Observable();
  }

  deleteService(id: string): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.delete(`${this.serviceUrl}/${id}`);
    }
    return new Observable();
  }

  getProjects(): Observable<any> {
    return this.http.get(this.projectUrl);
  }

  addProject(project: any): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.post(this.projectUrl, project);
    }
    return new Observable();
  }

  updateProject(id: string, project: any): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.put(`${this.projectUrl}/${id}`, project);
    }
    return new Observable();
  }

  deleteProject(id: string): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.delete(`${this.projectUrl}/${id}`);
    }
    return new Observable();
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get(`${this.serviceUrl}/${id}`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.projectUrl}/${id}`);
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
    services: any[] = [];
    projects: any[] = [];

    constructor(private dataService: DataService, private router: Router) {}


    ngOnInit(): void {
      this.fetchServices();
      this.fetchProjects();
    }

    fetchServices() {
      this.dataService.getServices().subscribe(data => {
        this.services = data;
      });
    }

    fetchProjects() {
      this.dataService.getProjects().subscribe(data => {
        this.projects = data;
      });
    }

    addService() {
      this.router.navigate(['/addservices']);
    }

    updateService(serviceId: string) {
      this.router.navigate(['/updateService', serviceId]);
    }

    deleteService(id: string) {
      this.dataService.deleteService(id).subscribe(() => {
        this.fetchServices();
      });
    }

    addProject() {
      this.router.navigate(['/addprojects']);
    }

    updateProject(projectId: string) {
      this.router.navigate(['/updateProject',projectId]);
    }

    deleteProject(id: string) {
      this.dataService.deleteProject(id).subscribe(() => {
        this.fetchProjects();
      });
    }
}

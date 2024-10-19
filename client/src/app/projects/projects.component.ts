import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    projects: any[] = [];

    constructor(private dataService: DataService) {}


    ngOnInit(): void {
      this.fetchProjects();
    }

    fetchProjects() {
      this.dataService.getProjects().subscribe(data => {
        this.projects = data;
      });
    }

}

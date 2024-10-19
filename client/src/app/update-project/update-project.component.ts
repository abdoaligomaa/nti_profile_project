import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: string;
  project: any = {};

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.projectForm = this.fb.group({
      link: ['', [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.projectId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchProjectData(this.projectId);
  }

  fetchProjectData(id: string) {
    this.dataService.getProjects().subscribe((projects: any[]) => {
      const project = projects.find(p => p._id === id);
      if (project) {
        this.project = project;

        this.projectForm.patchValue({
          link: project.link,
          title: project.title,
          description: project.description,
          icon: project.icon
        });
      }
    });
  }

  updateProject() {
    if (this.projectForm.valid) {
      const updatedProject = { ...this.projectForm.value, _id: this.projectId };
      this.dataService.updateProject(this.projectId, updatedProject).subscribe(() => {
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Error updating project:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  projectForm: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required])
  });

  constructor(private dataService: DataService, private router: Router) {}

  addProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.dataService.addProject(projectData).subscribe(() => {
        this.projectForm.reset();
        this.router.navigate(['/dashboard']); 
      }, error => {
        console.error('Error adding project:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

}

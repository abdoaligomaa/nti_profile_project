import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {

  serviceForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required])
  });

  // Constructor injecting the DataService
  constructor(private dataService: DataService, private router: Router) {}

  // Add new project method
  addService(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      this.dataService.addService(serviceData).subscribe(() => {
        this.serviceForm.reset();
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Error adding service:', error); 
      });
    } else {
      console.log('Form is invalid');
    }
  }

}

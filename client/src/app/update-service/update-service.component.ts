import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-service', 
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceId!: string;
  service: any = {};

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.serviceForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchServiceData(this.serviceId);
  }

  fetchServiceData(id: string) {

    this.dataService.getServices().subscribe((services: any[]) => {
      const service = services.find(s => s._id === id);
      if (service) {
        this.service = service;

        this.serviceForm.patchValue({
          email: service.email,
          title: service.title,
          description: service.description,
          icon: service.icon
        });
      }
    });
  }

  updateService() {
    if (this.serviceForm.valid) {
      const updatedService = { ...this.serviceForm.value, _id: this.serviceId };
      this.dataService.updateService(this.serviceId, updatedService).subscribe(() => {
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Error updating service:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

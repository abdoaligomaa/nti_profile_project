import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: any[] = [];

    constructor(private dataService: DataService) {}


    ngOnInit(): void {
      this.fetchServices();
    }

    fetchServices() {
      this.dataService.getServices().subscribe(data => {
        this.services = data;
      });
    }

}

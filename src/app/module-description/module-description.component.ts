import { Component, OnInit } from '@angular/core';
import { DataTransporterService } from '../injectables/data-transporter.service';

@Component({
  selector: 'app-module-description',
  templateUrl: './module-description.component.html',
  styleUrls: ['./module-description.component.css']
})
export class ModuleDescriptionComponent implements OnInit {
  transporterService: DataTransporterService;
  constructor(private readonly transporter: DataTransporterService) {
    this.transporterService = this.transporter;
  }

  ngOnInit() {
  }

}

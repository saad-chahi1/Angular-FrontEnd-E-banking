import { Component, AfterViewInit } from '@angular/core';
import { DashboardClientService } from '../services/dashboard-client.service';
@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private auth:DashboardClientService) {
    this.subtitle = 'This is some text within a card block.';
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit() { }
}

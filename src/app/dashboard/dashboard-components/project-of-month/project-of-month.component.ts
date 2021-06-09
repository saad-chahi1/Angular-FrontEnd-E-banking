import { Component, OnInit } from '@angular/core';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';
import { Product, TopSelling } from './project-data';

@Component({
  selector: 'app-project-of-month',
  templateUrl: './project-of-month.component.html',
  styleUrls: ['./project-of-month.component.css']
})
export class ProjectOfMonthComponent implements OnInit {

  topSelling: Product[];

  constructor(private myTransaction:DashboardClientService) {

    this.topSelling = TopSelling;
  }
  myArrayTransaction : any =[];

  ngOnInit(): void {
    this.getTransactions();
  }
  getTransactions(){
    this.myTransaction.getTheLastTransactions()
    .subscribe(data => {this.myArrayTransaction = data;});
  }

}

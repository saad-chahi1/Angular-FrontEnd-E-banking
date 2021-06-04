import { Component, OnInit } from '@angular/core';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';

@Component({
  selector: 'app-visit-graph',
  templateUrl: './visit-graph.component.html',
  styleUrls: ['./visit-graph.component.css']
})
export class VisitGraphComponent implements OnInit {

   

  constructor(private myCompte:DashboardClientService, private myTransaction:DashboardClientService) { }

  myArrayCompte : any =[];
  myArrayTransaction : any =[];

  ngOnInit(): void {
    this.getCompte();
    this.getTransaction();
  }
  
  getCompte(){
    this.myCompte.getAllComptes()
    .subscribe(data => {this.myArrayCompte = data;});
  }
  getTransaction(){
    this.myTransaction.getAllTransactions()
    .subscribe(data => {this.myArrayTransaction = data;});
  }  

}

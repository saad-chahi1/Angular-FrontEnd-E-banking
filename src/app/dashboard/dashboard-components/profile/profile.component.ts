import { Component, OnInit } from '@angular/core';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private myClient:DashboardClientService, 
    private myCompte:DashboardClientService) { }

  myArrayClient : any =[];
  myArrayCompte : any =[];

  ngOnInit(): void {
    this.getCommande();
    this.getCompte();
  }
  getCommande(){
    this.myClient.getAll()
    .subscribe(data => {this.myArrayClient = data;});
  }
  getCompte(){
    this.myCompte.getAllComptes()
    .subscribe(data => {this.myArrayCompte = data;});
  }
  

}

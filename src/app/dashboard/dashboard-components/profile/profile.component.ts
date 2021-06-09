import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private myClient:DashboardClientService, private myUser:DashboardClientService,
    private myCompte:DashboardClientService, private route: ActivatedRoute, private router: Router, 
    private http: HttpClient, private authService: DashboardClientService) { }

  myArrayClient : any =[];
  myArrayCompte : any =[];
  myuser : String = "";

  isLoggedin = false;
	
	loggedinUser: string = '';

	greeting : any =[];



  ngOnInit(): void {
    this.getCommande();
    this.getCompte();

    this.isLoggedin = this.authService.isUserLoggedIn();
		this.loggedinUser = this.authService.getLoggedinUser();
    this.myuser = this.myUser.getLoggedinUser();

		if(!this.isLoggedin) {
			this.router.navigateByUrl('login');
		}

		this.myClient.getAll().subscribe(data => this.greeting = data);
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

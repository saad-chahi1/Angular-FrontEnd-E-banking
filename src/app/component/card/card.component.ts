import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';
@Component({
  templateUrl: 'card.component.html'
})
export class CardsComponent {
  constructor(private myClient:DashboardClientService, 
    private myCompte:DashboardClientService, private route: ActivatedRoute, private router: Router, 
    private http: HttpClient, private authService: DashboardClientService) { }


  isLoggedin = false;
	
	loggedinUser: string = '';

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedIn();
		this.loggedinUser = this.authService.getLoggedinUser();

		if(!this.isLoggedin) {
			this.router.navigateByUrl('login');
		}
    this.doLogout();

  }
  doLogout() {
		this.authService.logout();
		this.router.navigateByUrl('login');
	}
}

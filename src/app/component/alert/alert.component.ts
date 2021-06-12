import { debounceTime } from 'rxjs/operators';
import { Input, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardClientService } from 'src/app/services/dashboard-client.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ngbd-alert',
  templateUrl: 'alert.component.html',
  styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b4;
      border-color: #800040;
    }
  `]
})
export class NgbdAlertBasicComponent implements OnInit {
  
  constructor(private myClient:DashboardClientService, 
    private myCompte:DashboardClientService, private route: ActivatedRoute, private router: Router, 
    private http: HttpClient, private authService: DashboardClientService) { }


  isLoggedin = false;
	
	loggedinUser: string = '';
  Commande : any={
    code_facture:'',
    montant_payment:''
  };

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedIn();
		this.loggedinUser = this.authService.getLoggedinUser();

		if(!this.isLoggedin) {
			this.router.navigateByUrl('login');
		}

  }
  myArray : any = [];
  postCommande(){
    this.authService.postData(this.Commande)
    .subscribe((myVariable)=>{
      this.myArray = [myVariable, ...this.myArray]
    })
  }

  
}


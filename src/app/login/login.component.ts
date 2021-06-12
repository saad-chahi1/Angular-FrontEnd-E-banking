import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardClientService } from '../services/dashboard-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string ="";
  password : string="";
  errorMessage = 'Invalid email or password';
  successMessage: string="";
  invalidLogin = false;
  loginSuccess = false;
  isLoggedin = false;
  
  constructor(private route: ActivatedRoute,
    private router: Router,private service:DashboardClientService) { }

  ngOnInit(): void {
    this.isLoggedin = this.service.isUserLoggedIn();
		if(this.isLoggedin) {
			this.router.navigateByUrl('/dashboard');
		}
   
  }

  handleLogin() {
    this.service.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.service.registerSuccessfulLogin(this.username, this.password);
      this.service.getIdUser();
      this.router.navigate(['component/accordion']);
      
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });    
  }

}

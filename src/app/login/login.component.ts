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
  
  constructor(private route: ActivatedRoute,
    private router: Router,private service:DashboardClientService) { }

  ngOnInit(): void {
   
  }

  handleLogin() {
    this.service.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/dashboard']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });    
  }

}

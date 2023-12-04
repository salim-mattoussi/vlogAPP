import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  author={
    email:'',
    password:'',
  }

  constructor(private _auth: AuthService, private router : Router){}
  token: any;
  login(){
    this._auth.login(this.author).subscribe(
      res=>{
        this.token = res;
        localStorage.setItem('token', this.token.mytoken)
        this.router.navigate(['/home'])
      }
    )
  }
}

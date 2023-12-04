import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  author ={
    name : '',
    lastname:'',
    email:'',
    password:'',
    about :''
  }
  image : any;
  select (e:any){
    this.image = e.target.files[0];
  }
  constructor(private _auth:AuthService, private route: Router){}
  register(){

    let formdata= new FormData();
    formdata.append('name',this.author.name)
    formdata.append('lastname',this.author.lastname)
    formdata.append('email',this.author.email)
    formdata.append('password',this.author.password)
    formdata.append('about',this.author.about)
    formdata.append('image',this.image)
    this._auth.register(formdata).subscribe(
      res=>{
        this.route.navigate(['/login']);
      }
    )

  }
}

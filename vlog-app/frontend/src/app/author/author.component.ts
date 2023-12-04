import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleDataService } from '../services/article-data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  id : any ;
  author : any;
  article : any;
  constructor(private act : ActivatedRoute, private _auth: AuthService, private dart:ArticleDataService){ }

  ngOnInit ():void{
    this.id= this.act.snapshot.paramMap.get('id');//get id from path url
    this._auth.getbyid(this.id)
    .subscribe(
      res=>{
        this.author = res;
       
        
      }
    )

    this.dart.getbyIdAuthor(this.id).subscribe(
      res=>{
        this.article= res;
      }, err=>{
        console.log(err);
        
      }
    )
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleDataService } from '../services/article-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent {


  article: any ={
    titre :'',
    content:'',
    tags:[],
    description:''
  }
  tag: any ='';
  image: any;

  select(e: any){
    this.image= e.target.files[0];
  }
  constructor(private _auth:AuthService , private Adata : ArticleDataService, private router : Router){}
  create(){
      let fd = new FormData();
      fd.append('titre',this.article.titre)
      fd.append('content',this.article.content)
      fd.append('tags',this.article.tags.toString())
      fd.append('description',this.article.description)
      fd.append('image',this.image)
      fd.append('idAuthor',this._auth.getAuthorDataFromToken()._id)

      this.Adata.create(fd).subscribe(
        res=>{
          this.router.navigate(['/home'])
        },
        err=>{
          console.log(err);
          
        }
      )
  }
}

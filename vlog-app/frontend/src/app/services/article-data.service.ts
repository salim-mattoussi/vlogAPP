import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  constructor(private http : HttpClient) { }

  private url ='http://127.0.0.1:3000/article/';

  create(article: any){
    return this.http.post(this.url +'addAll', article)
  }

  getAll (){
     return this.http.get(this.url +'all')
  }

  getbyIdAuthor (id : any ){
    return this.http.get(this.url +'getbyidauthor/'+id)
 }
 getArticleById (id : any ){
  return this.http.get(this.url +'getbyid/'+id)
}
}

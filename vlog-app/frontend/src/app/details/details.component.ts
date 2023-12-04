import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDataService } from '../services/article-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  id : any 
  article : any 

  constructor(private rout: ActivatedRoute, private Dact: ArticleDataService){}



  ngOnInit(): void {
    this.id = this.rout.snapshot.paramMap.get('id');
    this.Dact.getArticleById(this.id).subscribe(
      res=>{
        this.article= res;
      }
    )

  }
}

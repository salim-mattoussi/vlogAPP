import { Component } from '@angular/core';
import { ArticleDataService } from 'src/app/services/article-data.service';

@Component({
  selector: 'app-vloglist',
  templateUrl: './vloglist.component.html',
  styleUrls: ['./vloglist.component.css']
})
export class VloglistComponent {


  article : any ;
  constructor(private dart : ArticleDataService){
  
  }

  ngOnInit (): void{
      this.dart.getAll().subscribe(
        res=>{
          this.article= res;
        }, err=>{
          console.log(err);
          
        }
      )
  }
}

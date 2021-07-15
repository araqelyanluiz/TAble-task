import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../services/apartments.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  data: Array<any> = this.service.data.map(x=>x);
  pageData: Array<any> = [];
  pagesCount:Array<number> = [];
  activePage = 1;
  constructor(private service: ApartmentsService) {
    this.service.getData.subscribe(res=>{
      if(res){
        this.data.push(res);
      }
      this.refreshPages();
        this.paginate(this.activePage)
    })
  }
  
  ngOnInit(): void {}
  
  refreshPages(){
      
      if(Math.ceil(this.data.length/5)>this.pagesCount.length){
        this.pagesCount = [];
        for(let i=1;i<=Math.ceil(this.data.length/5);i++){
          this.pagesCount.push(i)
        }
      }
     
  }

  paginate(page:number){
    this.activePage = page;
    let start = (page - 1)*5;
    if(this.data.length>0){
      this.pageData = this.data.length - start>=5?this.data.slice(start,start+5):this.data.slice(start)
    }else{
      this.pageData = this.data;
    }
    
  }

  delete(i: number) {
    if (confirm('Вы уверены что хотите удалить эту строку?')) {
      this.service.delete(i);
    }
  }
}
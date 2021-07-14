import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../services/apartments.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  data: Array<any> = this.service.data.map(x=>{return x});
  pageData: Array<any> = [];
  pagesCount:Array<number> = [];
  activePage = 1;
  constructor(private service: ApartmentsService) {
    this.service.getData.subscribe(res=>{
      this.data.push(res);
      this.pagesCount = [];
      for(let i=1;i<= Math.ceil(this.data.length/5);i++){
        this.pagesCount.push(i)
      }
      this.paginate(1)
    })
  }
  

  ngOnInit(): void {}

  paginate(page:number){
    this.activePage = page;
    let start = (page - 1)*5;
    console.log(this.data)
    this.pageData = this.data.length - start>=5?this.data.slice(start,start+5):this.data.slice(start, this.data.length)
  }

  delete(i: number) {
    if (confirm('Вы уверены что хотите удалить эту строку?')) {
      this.service.delete(i);
    }
  }
}

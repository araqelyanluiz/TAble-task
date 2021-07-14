import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../services/apartments.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private service: ApartmentsService) {}
  data: Array<any> = this.service.myData;
  ngOnInit(): void {}

  delete(i: number) {
    if (confirm('Вы уверены что хотите удалить эту строку?')) {
      this.service.delete(i);
    }
  }
}

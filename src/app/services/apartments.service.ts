import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  dataSource = new BehaviorSubject<any>(null);
  data: Array<any> =
    localStorage.getItem('dataSource') != null
      ? JSON.parse(localStorage.getItem('dataSource') || '[]')
      : [];

  get getData() {
    return this.dataSource.asObservable();
  }

  constructor() {
  }

  setData(item: any) {
    this.data.push(item);
    localStorage.setItem('dataSource', JSON.stringify(this.data));
    this.dataSource.next(item);
  }

  delete(i: number) {
    this.data.splice(i, 1);
    localStorage.setItem('dataSource', JSON.stringify(this.data));
  }
}
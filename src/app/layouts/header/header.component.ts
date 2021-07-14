import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  showSidebar: boolean = false;
  ngOnInit(): void {}

  toggleMenu() {
    this.showSidebar = !this.showSidebar;
  }
}

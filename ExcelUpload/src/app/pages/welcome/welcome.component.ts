import { Component, OnInit } from '@angular/core';
import { CreateTestComponent } from './create-test/create-test.component';
import { LinksTableComponent } from './links-table/links-table.component';
// npm install ag-grid-angular
// https://www.ag-grid.com/angular-data-grid/getting-started/
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CreateTestComponent, LinksTableComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  isVisible = false;
  refresh: number = 1;
  constructor() {}

  showModal() {
    this.isVisible = true;
  }
  hideModal(event: any) {
    this.isVisible = false;
    this.refresh = this.refresh + 1;
  }
}

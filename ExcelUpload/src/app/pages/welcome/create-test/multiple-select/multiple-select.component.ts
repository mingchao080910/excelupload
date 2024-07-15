import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [NzSelectModule, FormsModule, CommonModule],
  templateUrl: './multiple-select.component.html',
  styleUrl: './multiple-select.component.css',
})
export class MultipleSelectComponent {
  @Output()
  SelectionChanged: EventEmitter<any> = new EventEmitter<string[]>();
  @Input() ControlName: string = '';
  @Input()
  listOfOption: string[] = [];
  listOfSelectedValue: string[] = [];
  listOfSelectedChanged() {
    this.SelectionChanged.emit([this.listOfSelectedValue, this.ControlName]);
  }
}

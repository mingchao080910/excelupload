import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputControlsComponent } from './input-controls/input-controls.component';

@Component({
  selector: 'app-input-modal',
  standalone: true,
  imports: [NzModalModule, InputControlsComponent],
  templateUrl: './input-modal.component.html',
  styleUrl: './input-modal.component.css',
})
export class InputModalComponent {
  @Input()
  isVisible = false;
  @Input()
  values!: any;
  @Output()
  valuesChange = new EventEmitter<any>();
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  constructor() {}

  handleOk(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.valuesChange.emit(this.values);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.values = null;
    this.valuesChange.emit(null);
  }

  handleValueChange(event: any) {
    this.values = event;
  }
}

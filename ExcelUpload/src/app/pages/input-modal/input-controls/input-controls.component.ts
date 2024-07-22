import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-input-controls',
  standalone: true,
  imports: [FormsModule, NzInputModule],
  templateUrl: './input-controls.component.html',
  styleUrl: './input-controls.component.css',
})
export class InputControlsComponent {
  @Input()
  value = null;
  @Output()
  valueChange = new EventEmitter<string>();
  handelValueChange(event: any) {

    this.valueChange.emit(event.target.value);
  }
}

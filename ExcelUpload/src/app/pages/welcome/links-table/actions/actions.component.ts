import { Component } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { DeleteComponent } from '../delete/delete.component';
import { UpdateComponent } from '../update/update.component';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular/lib/interfaces';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [UploadComponent, DeleteComponent, UpdateComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent implements ICellRendererAngularComp{

  // Init Cell Value
 public value!: string;
 agInit(params: ICellRendererParams): void {
   this.value = params.value;
 }

 // Return Cell Value
 refresh(params: ICellRendererParams): boolean {
   this.value = params.value;
   return true;
 }
}

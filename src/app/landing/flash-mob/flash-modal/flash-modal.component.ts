import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-flash-modal',
  templateUrl: './flash-modal.component.html',
  styleUrls: ['./flash-modal.component.scss']
})
export class FlashModalComponent {
  data: { name: string, mail: string } = {
    name: '',
    mail: '',
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: any,
    ) {
  }
}

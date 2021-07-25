import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meme-modal',
  templateUrl: './meme-modal.component.html',
  styleUrls: ['./meme-modal.component.scss']
})
export class MemeModalComponent {
  data: { name: string, mail: string } = {
    name: '',
    mail: '',
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: any,
    ) {
  }
}
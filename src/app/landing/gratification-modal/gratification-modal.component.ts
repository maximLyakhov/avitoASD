import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gratification-modal',
  templateUrl: './gratification-modal.component.html',
  styleUrls: ['./gratification-modal.component.scss']
})
export class GratificationModalComponent implements OnInit {
  data: { status: boolean };

  constructor(
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) {
    this.data = datas;
  }

  ngOnInit(): void {
  }
}

import { ContestImage } from './../contracts/contest-image.interface';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './admin.service';
import { Meme } from '../contracts/meme.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  form = this.fb.group({
    key: ['', Validators.required],
    value: ['', Validators.required],
  });
  keyvalue: { key: ''; value: ''; } = { 'key': '', 'value': '' };
  hideForm = false;
  pendingMemes: Meme[] = [];
  pendingContestImages: ContestImage[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
  ) {
    this.form.valueChanges.subscribe(res => {
      this.keyvalue = res;
    });
  }

  proceed() {
    this.hideForm = true;

    this.service.key = this.form.controls.key.value;
    this.service.value = this.form.controls.value.value;


    this.service.getPendingMemes()
      .subscribe(memes => this.pendingMemes = memes);

    this.service.getPendingContestImages()
      .subscribe(images => this.pendingContestImages = images);
  }
}

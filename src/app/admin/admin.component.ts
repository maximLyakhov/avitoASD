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
    localStorage.setItem('data', JSON.stringify(this.keyvalue));

    this.service.getPendingMemes()
      .subscribe(memes => this.pendingMemes = memes);

    this.service.getPendingContestImages()
      .subscribe(images => this.pendingContestImages = images);
  }

  public approveMeme(id: number) {
    return this.service.approveMeme(id)
      .subscribe(res => this.memeHandler(id, res));
  }

  public rejectMeme(id: number) {
    return this.service.rejectMeme(id)
      .subscribe(res => this.memeHandler(id, res));
  }

  public approveContestImage(id: number) {
    return this.service.approveContestImage(id)
      .subscribe(res => this.contestImageHandler(id, res));
  }

  public rejectContestImage(id: number) {
    return this.service.rejectContestImage(id)
      .subscribe(res => this.contestImageHandler(id, res));
  }

  private memeHandler(id: number, res: any): void {
    if (res) {
      const rejectedIndex = this.pendingMemes.findIndex(thing => thing.id === id);
      this.pendingMemes.splice(rejectedIndex, 1);
    }
  }

  private contestImageHandler(id: any, res: any): void {
    if (res) {
      const rejectedIndex = this.pendingContestImages.findIndex(thing => thing.id === id);
      this.pendingContestImages.splice(rejectedIndex, 1);
    }
  }
}

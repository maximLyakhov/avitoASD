import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemeGeneratorService } from './meme-generator.service';
import { Meme } from '../contracts/meme.interface';
import { Location } from '@angular/common';
import { MemeModalComponent } from '../landing/meme-contest/meme-modal/meme-modal.component';
import { LandingService } from '../landing/landing.service';
import { MatDialog } from '@angular/material/dialog';
import domtoimage from 'dom-to-image';
import { GratificationModalComponent } from '../landing/gratification-modal/gratification-modal.component';

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss'],
})
export class MemeGeneratorComponent implements OnInit {
  @ViewChild('topScroll') topScroll: ElementRef | undefined;
  @ViewChild('drawnMeme') userMeme: ElementRef | undefined;
  readonly memeCreation: FormGroup = new FormGroup({
    top: new FormControl('', Validators.required),
    bottom: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
  });;
  topText: string = '';
  bottomText: string = '';
  selectedImage: number | null = null;
  changes: any;

  baseImages: string[] = [];
  pendingMemes: Meme[] = [];
  approvedMemes: Meme[] = [];

  constructor(
    private service: MemeGeneratorService,
    private location: Location,
    private landing: LandingService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.service.getBaseImages().subscribe(res => {
      this.baseImages = res;
    });
    this.memeCreation.valueChanges.subscribe((result: { top: string, bottom: string, id: string }) => {
      this.changes = result;
      this.topText = result.top;
      this.bottomText = result.bottom;
    })
  }

  selectBaseImage(item: any, i: number) {
    this.memeCreation.controls.id.setValue(item);
    this.selectedImage = i;
  }

  public goBack() {
    this.location.back();
  }

  public createMeme() {
    domtoimage
      .toBlob(this.userMeme!.nativeElement, { quality: 100, bgcolor: 'transparent', height: 300, width: 300 })
      .then(blob => {
        const file = this.service.blobToFile(blob, 'meme')
        this.service.uploadFile(file).subscribe((result: any) => {
          this.dialog
            .open(MemeModalComponent, {
              panelClass: 'flash-mob-modal',
              data: { id: result.guid }
            })
            .afterClosed()
            .subscribe(res => {
              this.landing
                .postMemeName({ name: res.name, mail: res.mail }, result.guid)
                .subscribe(
                  (res) => {
                    this.dialog.open(GratificationModalComponent, { data: { status: true }, panelClass: 'flash-mob-modal',})
                  },
                  (error) => {
                    this.dialog.open(GratificationModalComponent, { data: { status: false }, panelClass: 'flash-mob-modal',})
                  }
                )
            });
        });
      });
  }
}

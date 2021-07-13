import html2canvas from 'html2canvas';
import { MemeGeneratorService } from './meme-generator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meme } from '../contracts/meme.interface';
import { Location } from '@angular/common';

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

  mockMemes: string[] = [
    '../../assets/tearsofjoy.jpg',
    '../../assets/unnamed.jpg',
    '../../assets/Troll-Face.png'
  ];

  baseImages: string[] = [];
  pendingMemes: Meme[] = [];
  approvedMemes: Meme[] = [];

  constructor(
    private service: MemeGeneratorService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getBaseImages();
    this.getApprovedMemes();
    this.getPendingMemes();
    this.memeCreation.valueChanges.subscribe((result: { top: string, bottom: string, id: string }) => {
      this.changes = result;
      this.topText = result.top;
      this.bottomText = result.bottom;
    })
  }

  private getBaseImages() {
    this.service.getBaseImages().subscribe(res => {
      this.baseImages = res.concat(this.mockMemes)
    });
  }

  private getApprovedMemes() {
    this.service.getApprovedMemes().subscribe(res => {
      this.approvedMemes = res;
    });
  }

  private getPendingMemes() {
    this.service.getPendingMemes().subscribe(res => {
      this.pendingMemes = res;
    });
  }

  selectBaseImage(item: any, i: number) {
    this.memeCreation.controls.id.setValue(item);
    this.selectedImage = i;
  }

  public goBack() {
    this.location.back();
  }

  public createMeme() {
    // this.topScroll!.nativeElement.scrollIntoView({ inline: 'start', block: 'center' });
    html2canvas(this.userMeme!.nativeElement, {
      width: 500,
      height: 500,
      // removeContainer: true,
      allowTaint: true,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    })
      .then(canvas => canvas.toBlob(blob => {
        this.service.uploadFile(this.service.blobToFile(blob as Blob, 'meme'))
      }, 'image/png', 100));
  }

  public approveMeme(id: number) {
    return this.service.approveMeme(id)
      .subscribe(res => this.memeHandler(id, res));
  }

  public rejectMeme(id: number) {
    return this.service.rejectMeme(id)
      .subscribe(res => this.memeHandler(id, res));
  }

  private memeHandler(id: number, res: any): void {
    if (res) {
      const rejectedIndex = this.pendingMemes.findIndex(thing => thing.id === id);
      this.pendingMemes.splice(rejectedIndex, 1);
      this.getApprovedMemes();
    }
  }
}

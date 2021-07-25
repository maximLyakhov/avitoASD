import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-insta-mask',
  templateUrl: './insta-mask.component.html',
  styleUrls: ['./insta-mask.component.scss']
})
export class InstaMaskComponent {
  @ViewChild('link') link: ElementRef | undefined;
  click() {
    this.link!.nativeElement.click();
  }
}

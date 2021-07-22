import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-flash-game',
  templateUrl: './flash-game.component.html',
  styleUrls: ['./flash-game.component.scss']
})
export class FlashGameComponent {
  @ViewChild('link') link: ElementRef | undefined;
  click() {
    this.link!.nativeElement.click();
  }
}

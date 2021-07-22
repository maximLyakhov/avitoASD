import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-meme-contest',
  templateUrl: './meme-contest.component.html',
  styleUrls: ['./meme-contest.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MemeContestComponent {
  @ViewChild('link') link: ElementRef | undefined;
  @ViewChild('link2') linkTwo: ElementRef | undefined;
  click() {
    this.link!.nativeElement.click();
  }
  clickTwo() {
    this.linkTwo!.nativeElement.click();
  }
}

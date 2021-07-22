import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-flash-mob',
  templateUrl: './flash-mob.component.html',
  styleUrls: ['./flash-mob.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashMobComponent {
  @ViewChild('link') link: ElementRef | undefined;
  click() {
    this.link!.nativeElement.click();
  }
}

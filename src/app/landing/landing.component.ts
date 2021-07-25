import { LandingService } from './landing.service';
import { Component, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import SwiperCore from 'swiper/core';
import { Pagination, Mousewheel, Keyboard, Swiper } from 'swiper/core';

SwiperCore.use([Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.global.scss', './landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LandingComponent implements OnDestroy {
  arr = [
    '',
    '2011',
    '',
    '',
    '',
    '',
    '2021',
    '',
    '',
    // '',
    '',
    '',
    '2121',
    '',
    '',
  ]
  private destroy$ = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private service: LandingService,
  ) {
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  currentIndex(smthnh: any) {
    this.zone.run(() => {
      const swiper = smthnh as Swiper;
      this.service.activeIndex.next(swiper.activeIndex);
      this.router.navigate(['/'], { queryParams: { slide: swiper.activeIndex } });
    })
  }

  swiperAfterInit(some: any) {
    let i = 0;
    document.querySelectorAll('.swiper-pagination-bullet')
            .forEach(e => {
              const el = document.createElement('span');
              el.className = 'page-year';
              el.innerHTML = this.arr[i];
              e.appendChild(el);
              i++
            });

    this.zone.run(() => {
      const swiper = some as Swiper;
      swiper.slideTo(this.route.snapshot.queryParams.slide);
      this.router.navigate(['/'], { queryParams: { slide: swiper.activeIndex } });
    })
  }
}

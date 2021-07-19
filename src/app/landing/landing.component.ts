import { Component, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import SwiperCore from 'swiper/core';
import { Pagination, Mousewheel, Keyboard, Swiper } from 'swiper/core';
import { setVh } from '../constants/vh';

SwiperCore.use([Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LandingComponent implements OnDestroy {
  private destroy$ = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
  ) {
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  currentIndex(smthnh: any) {
    setVh();
    this.zone.run(() => {
      const swiper = smthnh as Swiper;
      this.router.navigateByUrl(`#${swiper.activeIndex}`);
    })
  }

  swiperAfterInit(some: any) {
    this.zone.run(() => {
      const swiper = some as Swiper;
      swiper.slideTo(+this.route.snapshot.fragment!);
      this.router.navigateByUrl(`#${swiper.activeIndex}`);
    })
  }
}

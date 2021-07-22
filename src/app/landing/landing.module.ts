import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SwiperModule } from "swiper/angular";
import { FutureWithAlpacaComponent } from './future-with-alpaca/future-with-alpaca.component';
import { AvitoAsdComponent } from './avito-asd/avito-asd.component';
import { TwentyElevenComponent } from './twenty-eleven/twenty-eleven.component';
import { RetroMovieComponent } from './retro-movie/retro-movie.component';
import { FlashGameComponent } from './flash-game/flash-game.component';
import { MemeContestComponent } from './meme-contest/meme-contest.component';
import { InstaMaskComponent } from './insta-mask/insta-mask.component';
import { StickerPackComponent } from './sticker-pack/sticker-pack.component';
import { FlashMobComponent } from './flash-mob/flash-mob.component';
import { VideoJokeComponent } from './video-joke/video-joke.component';
import { FinalStreamComponent } from './final-stream/final-stream.component';
import { TwentyOneComponent } from './twenty-one/twenty-one.component';
import { StoryShowComponent } from './story-show/story-show.component';
import { TwentyOneDoubleComponent } from './twenty-one-double/twenty-one-double.component';
import { SecondMaskComponent } from './second-mask/second-mask.component';
import { AlpacaComponent } from './alpaca/alpaca.component';

@NgModule({
  declarations: [
    LandingComponent,
    FutureWithAlpacaComponent,
    AvitoAsdComponent,
    TwentyElevenComponent,
    RetroMovieComponent,
    FlashGameComponent,
    MemeContestComponent,
    InstaMaskComponent,
    StickerPackComponent,
    FlashMobComponent,
    VideoJokeComponent,
    FinalStreamComponent,
    TwentyOneComponent,
    StoryShowComponent,
    TwentyOneDoubleComponent,
    SecondMaskComponent,
    AlpacaComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SwiperModule,  
  ]
})
export class LandingModule { }

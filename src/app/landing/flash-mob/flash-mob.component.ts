import { GratificationModalComponent } from './../gratification-modal/gratification-modal.component';
import { ContestImage } from './../../contracts/contest-image.interface';
import { FlashModalComponent } from './flash-modal/flash-modal.component';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import { LandingService } from './../landing.service';
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-flash-mob',
  templateUrl: './flash-mob.component.html',
  styleUrls: ['./flash-mob.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashMobComponent implements OnInit {
  @ViewChild('file') file!: HTMLInputElement;
  constructor(
    private service: LandingService,
    public dialog: MatDialog,
  ) {
  }
  flashMobImages: ContestImage[] = [
  ];

  ngOnInit() {
    this.getContestImages();
  }

  getContestImages() {
    this.service.getContestImages().subscribe(res => {
      if (res && res.length) {
        const storedLikes = localStorage.getItem('likes')
        if (storedLikes) {
          const idlike: ContestImage[] = JSON.parse(storedLikes);
          res.forEach(el => {
            const found = idlike.find(e => el.id === e.id);
            if (found) {
              if (el.id === found.id) {
                el.liked = found.liked;
              }
            }
            return el;
          })
          this.flashMobImages = res;
        } else {
          this.flashMobImages = res;
        }
      }
    });
  }

  negate(img: any) {
    if (img) {
      img.likes++;
      const likesArray = this.flashMobImages.map((image) => ({
        id: image.id,
        liked: image.liked
      }));
      localStorage.setItem('likes', JSON.stringify(likesArray));
      this.service.sendLike(img.id).subscribe();
    }
    img.liked = true;
  }

  public uploadFile(files: any) {
    if (files.length === 0) {
      return;
    } else {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.service
          .postContestImage(formData)
          .subscribe((result) => {
            const config = {
              panelClass: 'flash-mob-modal',
              data: { id: result.guid }
            };
            this.dialog.open(FlashModalComponent, config)
                .afterClosed()
                .subscribe(res => {
                  this.service.postContestName({ name: res.name, mail: res.mail }, result.guid)
                    .subscribe(
                      (res) => {
                        this.dialog.open(GratificationModalComponent, { data: { status: true }, panelClass: 'flash-mob-modal',})
                      },
                      (error) => {
                        this.dialog.open(GratificationModalComponent, { data: { status: false }, panelClass: 'flash-mob-modal',})
                      }
                    )
                });
          },
          (error) => {
            this.dialog.open(GratificationModalComponent, { data: { status: false }, panelClass: 'flash-mob-modal',})
          });
    }
  }
}

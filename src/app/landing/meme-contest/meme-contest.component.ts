import { MemeModalComponent } from './meme-modal/meme-modal.component';
import { LandingService } from './../landing.service';
import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
import { MatDialog } from '@angular/material/dialog';
import { GratificationModalComponent } from '../gratification-modal/gratification-modal.component';
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-meme-contest',
  templateUrl: './meme-contest.component.html',
  styleUrls: ['./meme-contest.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MemeContestComponent {
  constructor(
    private service: LandingService,
    public dialog: MatDialog,
  ) {
  }

  public uploadFile(files: any) {
    if (files.length === 0) {
      return;
    } else {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.service
          .postMemeImage(formData)
          .subscribe(result => {
            this.dialog.open(MemeModalComponent, {
              panelClass: 'flash-mob-modal',
              data: { id: result.guid }
            })
                .afterClosed()
                .subscribe(res => {
                  this.service.postMemeName({name: res.name, mail: res.mail}, result.guid)
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
    }
  }
}

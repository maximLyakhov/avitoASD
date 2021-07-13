import { ContestImageService } from './contest-image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contest-image',
  templateUrl: './contest-image.component.html',
  styleUrls: ['./contest-image.component.scss']
})
export class ContestImageComponent implements OnInit {

  constructor(
    private service: ContestImageService
  ) { }

  ngOnInit(): void {
    this.service.getApprovedContestImages().subscribe(console.log);
    this.service.getPendingContestImages().subscribe(console.log);
  }

}

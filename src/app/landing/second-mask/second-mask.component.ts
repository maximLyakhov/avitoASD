import { Component } from '@angular/core';

@Component({
  selector: 'app-second-mask',
  templateUrl: './second-mask.component.html',
  styleUrls: ['./second-mask.component.scss']
})
export class SecondMaskComponent {
  wear() {
    window.open('https://www.instagram.com/ar/507998426969997', '_blank')
  }
}

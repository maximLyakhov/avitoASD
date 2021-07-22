import { ToastrService } from 'ngx-toastr';
import { AlpacaSet } from './../../contracts/alpaca.interface';
import { AfterViewInit, Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-alpaca',
  templateUrl: './alpaca.component.html',
  styleUrls: ['./alpaca.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlpacaComponent implements AfterViewInit {
  @ViewChild('img') alpaca: ElementRef | undefined;

  idle: AlpacaSet = {
    path: '../../../assets/alpaca/стоит.gif',
    duration: 900,
  }
  turnsOut: AlpacaSet = {
    path: '../../../assets/alpaca/отворачивается.gif',
    duration: 1080,
  }
  turnsIn: AlpacaSet = {
    path: '../../../assets/alpaca/поворачивается.gif',
    duration: 1230,
  }
  talks: AlpacaSet = {
    path: '../../../assets/alpaca/говорит.gif',
    duration: 1800,
  }
  moves: AlpacaSet = {
    path: '../../../assets/alpaca/движение.gif',
    duration: 2640,
  }

  variable: AlpacaSet = this.moves;

  constructor(
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    // console.log('this.alpaca: ', this.alpaca);
  }

  reset() {
    this.variable = {
      path: '', duration: 0,
    }
  }

  clicked() {
    this.toastr.success('Тебя отальпачили!', 'Привет!', {
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    });
    this.reset();
    this.variable = this.turnsIn;
    setTimeout(() => {
      this.reset();
      this.variable = this.talks;
      setTimeout(() => {
        this.reset();
        this.variable = this.turnsOut;
        setTimeout(() => {
          this.reset();
          this.variable = this.moves;
        }, this.turnsOut.duration);
      }, this.talks.duration);
    }, this.turnsIn.duration);
  }
}

import { AfterViewInit, Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AlpacaSet } from './../../contracts/alpaca.interface';
import { LandingService } from './../landing.service';

@Component({
  selector: 'app-alpaca',
  templateUrl: './alpaca.component.html',
  styleUrls: ['./alpaca.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlpacaComponent implements AfterViewInit {
  @ViewChild('img') alpaca: ElementRef | undefined;

  idle: AlpacaSet = {
    path: '../../../assets/alpaca/stands',
    duration: 900,
  }
  turnsOut: AlpacaSet = {
    path: '../../../assets/alpaca/tout',
    duration: 1380,
  }
  turnsIn: AlpacaSet = {
    path: '../../../assets/alpaca/tin',
    duration: 1350,
  }
  talks: AlpacaSet = {
    path: '../../../assets/alpaca/talks',
    duration: 1800,
  }
  moves: AlpacaSet = {
    path: '../../../assets/alpaca/move',
    duration: 2640,
  }

  variable: AlpacaSet = this.moves;
  variables: AlpacaSet[] = [this.idle, this.turnsOut, this.turnsIn, this.talks, this.moves];

  messages = false;
  currentPhrase = 0;
  phrases: string[] = [
    'Привет, я Альпака!',
    'Меня зовут Шарлотка (можно Шарли)!',
    'Авито ASD взяли меня на попечительство',
    'Живу я в Ленинградском зоопарке, приходи в гости',
    'Что тебе еще рассказать?',
    'Я люблю есть сено...',
    'Гулять...',
    'Зачем так много тыкать? Тебя меня не жалко? Я же милая альпака…😢',
    '- Я альпака. Домашнее мозоленогое животное, произошедшее от викуньи… Ладно-ладно, можно просто лама',
    'Надо сделать компьютер для альпак. Мы там будем нажимать на маленького человечка внизу экрана!',
    'Пока ты тыщу раз на меня нажимаешь, твой коллега оформил сделку и его повысили.',
    'О-о-о, пора в отпуск. Ты уже альпак на работе видишь',
    'Древние инки охотились на меня с копьями, сейчас 2021 год и ты тычешь в меня мышкой',
    'Я слышала у кофемашины классные кнопки, может ты ее понажимаешь?',
    'Будешь нажимать, я сниму побои и обращусь в органы. Я же внутри твоего компьютера, если не перестанешь, я скину всю историю твоего браузера.',
    'Нажми на меня пять раз и получишь подарок',
    'Да, не думала, что в нашей компании работают такие наивные сотрудники',
    'Я вообще то из семейства верблюжьих. Не боишься, что я в тебя плюну? 🤪',
    'М-м-м, а можешь ещё по спине мышкой поводить?',
    'О-о-о класс, вот так!',
    'Встречаются русский, американец и еврей:',
    'Американец говорит: — Давайте у меня соберемся, я закуски соберу, барбекю сделаем, хот-догов…',
    'Русский говорит: — Тогда я с ящиком водки приду!!!',
    'Еврей: — Ну а я — с братом!',
    'Посмеялся? Теперь за работу!'
  ];
  clickCount = 0;
  activeSlide: number | undefined;

  ngAfterViewInit(): void {
  }

  constructor(
    private service: LandingService,
  ){
    this.service.activeIndex.subscribe(i => this.activeSlide = i);
  }

  clicked(dur: number) {
    if (dur === this.moves.duration) {
      if (this.currentPhrase === 16) {
        this.clickCount++;
        if (this.clickCount === 5) {
          this.animation();
        }
      } else {
        this.animation();
      }
    }
  }

  animation() {
    this.variable = this.turnsIn;
    setTimeout(() => {
      this.messages = true;
      this.variable = this.talks;
      setTimeout(() => {
        this.variable = this.turnsOut;
        setTimeout(() => {
          this.variable = this.moves;
          this.messages = false;
          this.currentPhrase++;
        }, this.turnsOut.duration);
      }, this.talks.duration * 2);
    }, this.turnsIn.duration);
  }
}

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

  phrases: string[] = [
    'Привет, я Альпака!',
    'Меня зовут Шарлотка (можно Шарли)!',
    'Авито ASD взяли меня на попечительство',
    'Живу я в Ленинградском зоопарке, приходи в гости',
    'Что тебе еще рассказать ?',
    '-Я люблю есть сено',
    'Гулять',
    'Зачем так много тыкать ? Тебя меня не жалко ? Я же милая альпака…😢',
    '-	Я альпака.Домашнее мозоленогое животное, произошедшее от викуньи… Ладно ладно, можно просто лама. Надо сделать компьютер для альпак.Мы там будем нажимать на маленького человечка внизу экрана!',
    'Пока ты тыщу раз на меня нажимаешь, твой коллега оформил сделку и его повысили.',
    'О о о, пора в отпуск.Ты уже альпак на работе видишь.',
    'Древние инки охотились на меня с копьями, сейчас 2021 год и ты тычешь в меня мышкой',
    'Я слышала у кофемашины классные кнопки, может ты ее понажимаешь ?',
    'Будешь нажимать, я сниму побои и обращусь в органы. Я же внутри твоего компьютера, если не перестанешь, я скину всю  историю твоего браузера.',
    'Нажми на меня пять раз и получишь подарок',
    '(Сотрудник нажимает пять раз)',
    'Да, не думала, что в нашей компании работают такие наивные сотрудники',
    'Я вообще то из семейства верблюжьих.Не боишься, что я в тебя плюну ? 🤪',
    'М м м а можешь ещё по спине мышкой поводить ? (Рукой поводить) О о о класс, вот так!',
    `Встречаются русский, американец и еврей:
    Американец говорит:
    — Давайте у меня соберемся, я закуски соберу, барбекю сделаем, хот-догов…
    Русский говорит:
    — Тогда я с ящиком водки приду!!!
    Еврей:
    — Ну а я — с братом!
    Посмеялся ? Теперь за работу!`
  ]

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
    this.toastr.success('Тебя отальпачили!', '', {
      timeOut: 100000,
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

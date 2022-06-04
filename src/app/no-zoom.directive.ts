import { Directive, ElementRef, HostListener } from '@angular/core';

const MINIMAL_FONT_SIZE_BEFORE_ZOOMING_IN_PX = 16;

@Directive({ selector: '[appNoZoomiOS]' })

export class NoZoomDirective {
  constructor(private el: ElementRef) { }

  @HostListener('focus')
  onFocus() {
    this.setFontSize('');
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.setFontSize(`${MINIMAL_FONT_SIZE_BEFORE_ZOOMING_IN_PX}px`);
  }

  private setFontSize(size: string) {
    const { fontSize: currentInputFontSize } = window.getComputedStyle(this.el.nativeElement, null);


    if (currentInputFontSize) {
      // @ts-ignore: Object is possibly 'null'.
      if (MINIMAL_FONT_SIZE_BEFORE_ZOOMING_IN_PX <= +currentInputFontSize.match(/\d+/)) {
        return;
      }

      const iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      iOS
        && (this.el.nativeElement.style.fontSize = size);
    }
  }
}
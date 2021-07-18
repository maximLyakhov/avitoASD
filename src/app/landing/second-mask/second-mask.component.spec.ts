import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondMaskComponent } from './second-mask.component';

describe('SecondMaskComponent', () => {
  let component: SecondMaskComponent;
  let fixture: ComponentFixture<SecondMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

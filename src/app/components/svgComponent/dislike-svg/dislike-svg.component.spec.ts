import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislikeSvgComponent } from './dislike-svg.component';

describe('DislikeSvgComponent', () => {
  let component: DislikeSvgComponent;
  let fixture: ComponentFixture<DislikeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislikeSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DislikeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

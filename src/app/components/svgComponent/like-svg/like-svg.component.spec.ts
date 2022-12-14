import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeSvgComponent } from './like-svg.component';

describe('LikeSvgComponent', () => {
  let component: LikeSvgComponent;
  let fixture: ComponentFixture<LikeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

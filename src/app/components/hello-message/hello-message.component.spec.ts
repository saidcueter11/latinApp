import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloMessageComponent } from './hello-message.component';

describe('HelloMessageComponent', () => {
  let component: HelloMessageComponent;
  let fixture: ComponentFixture<HelloMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

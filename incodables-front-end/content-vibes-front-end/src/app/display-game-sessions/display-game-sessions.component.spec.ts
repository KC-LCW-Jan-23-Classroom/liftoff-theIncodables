import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGameSessionsComponent } from './display-game-sessions.component';

describe('DisplayGameSessionsComponent', () => {
  let component: DisplayGameSessionsComponent;
  let fixture: ComponentFixture<DisplayGameSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayGameSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGameSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

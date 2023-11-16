import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSelectionComponent } from './music-selection.component';

describe('MusicSelectionComponent', () => {
  let component: MusicSelectionComponent;
  let fixture: ComponentFixture<MusicSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicSelectionComponent]
    });
    fixture = TestBed.createComponent(MusicSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

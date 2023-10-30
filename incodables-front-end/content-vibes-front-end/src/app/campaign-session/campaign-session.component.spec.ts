import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSessionComponent } from './campaign-session.component';

describe('CampaignSessionComponent', () => {
  let component: CampaignSessionComponent;
  let fixture: ComponentFixture<CampaignSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignSessionComponent]
    });
    fixture = TestBed.createComponent(CampaignSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

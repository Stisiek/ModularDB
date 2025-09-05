import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserPanelComponent } from './super-user-panel.component';

describe('SuperUserPanelComponent', () => {
  let component: SuperUserPanelComponent;
  let fixture: ComponentFixture<SuperUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperUserPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

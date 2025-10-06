import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesPageComponent } from './tiles-page.component';

describe('TilesPageComponent', () => {
  let component: TilesPageComponent;
  let fixture: ComponentFixture<TilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

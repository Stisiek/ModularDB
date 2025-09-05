import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMakerComponent } from './box-maker.component';

describe('BoxMakerComponent', () => {
  let component: BoxMakerComponent;
  let fixture: ComponentFixture<BoxMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

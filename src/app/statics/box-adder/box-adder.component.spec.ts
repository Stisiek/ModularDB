import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAdderComponent } from './box-adder.component';

describe('BoxAdderComponent', () => {
  let component: BoxAdderComponent;
  let fixture: ComponentFixture<BoxAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPopUpComponent } from './menu-pop-up.component';

describe('MenuPopUpComponent', () => {
  let component: MenuPopUpComponent;
  let fixture: ComponentFixture<MenuPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

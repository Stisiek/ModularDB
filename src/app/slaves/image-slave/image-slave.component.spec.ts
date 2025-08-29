import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSlaveComponent } from './image-slave.component';

describe('ImageSlaveComponent', () => {
  let component: ImageSlaveComponent;
  let fixture: ComponentFixture<ImageSlaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSlaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSlaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

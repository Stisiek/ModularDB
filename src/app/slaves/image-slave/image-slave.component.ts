import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slave',
  imports: [NgIf],
  templateUrl: './image-slave.component.html',
  styleUrl: './image-slave.component.css'
})
export class ImageSlaveComponent {
  @Input() imageSrc: string = '';
  @Input() imgName: string = 'Opis zdjęcia';
}

import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [FormsModule, NgIf],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent {
  @Input() isBeingCreated = false;
  isNumberValue = false;

  @Input() titleValue: string = 'Nagłówek';
  value: string = '';
}

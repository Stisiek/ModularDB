import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-simple-text',
  imports: [FormsModule, NgIf],
  templateUrl: './simple-text.component.html',
  styleUrl: './simple-text.component.css'
})
export class SimpleTextComponent {
  @Input() isBeingCreated = false;
  isNumberValue = false;

  @Input() titleValue: string = 'Title';
  value: string = '';
}

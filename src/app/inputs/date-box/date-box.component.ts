import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-box',
  imports: [NgIf, FormsModule],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.css'
})
export class DateBoxComponent {
  isBeingCreated: boolean = false;
  titleValue: string = 'Opis daty';
  @Input() isFromTo: boolean = false;

  dateFromValue = new Date(2021, 10, 10);
  dateToValue = new Date(2021, 10, 25);
}

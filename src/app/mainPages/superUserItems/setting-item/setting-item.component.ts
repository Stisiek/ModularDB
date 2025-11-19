import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-item',
  imports: [FormsModule],
  templateUrl: './setting-item.component.html',
  styleUrl: './setting-item.component.css'
})
export class SettingItemComponent {
  @Input() settingName: string = '';
  @Input() settingValue: boolean = false;
}

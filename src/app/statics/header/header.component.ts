import { Component } from '@angular/core';
import { QuickOptionsComponent } from "../quick-options/quick-options.component";

@Component({
  selector: 'app-header',
  imports: [QuickOptionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  appName = 'Steel App';
}

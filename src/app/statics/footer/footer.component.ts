import { Component } from '@angular/core';
import { QuickOptionsComponent } from "../quick-options/quick-options.component";

@Component({
  selector: 'app-footer',
  imports: [QuickOptionsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
}

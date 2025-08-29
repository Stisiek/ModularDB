import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextAreaComponent } from "./inputs/text-area/text-area.component";
import { SimpleTextComponent } from "./inputs/simple-text/simple-text.component";
import { ImagesBoxComponent } from "./inputs/images-box/images-box.component";
import { FileBoxComponent } from "./inputs/file-box/file-box.component";
import { DateBoxComponent } from "./inputs/date-box/date-box.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextAreaComponent, SimpleTextComponent, ImagesBoxComponent, FileBoxComponent, DateBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tomsteel-app';
}

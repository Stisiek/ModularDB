import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextAreaComponent } from "./inputs/text-area/text-area.component";
import { SimpleTextComponent } from "./inputs/simple-text/simple-text.component";
import { ImagesBoxComponent } from "./inputs/images-box/images-box.component";
import { FileBoxComponent } from "./inputs/file-box/file-box.component";
import { DateBoxComponent } from "./inputs/date-box/date-box.component";
import { HeaderComponent } from "./statics/header/header.component";
import { MainViewComponent } from "./statics/main-view/main-view.component";
import { FooterComponent } from "./statics/footer/footer.component";
import { LoadingScreenComponent } from "./statics/loading-screen/loading-screen.component";
import { LoginMgrService } from './services/login-mgr.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainViewComponent, FooterComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tomsteel-app';

  constructor(private loginMgr: LoginMgrService) { }

  ngOnInit() {
    this.loginMgr.logInWithToken();
  }
}

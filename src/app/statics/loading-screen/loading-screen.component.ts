import { Component } from '@angular/core';
import { LoadingMgrService } from '../../services/loading-mgr.service';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})
export class LoadingScreenComponent {
  constructor(public loadingService: LoadingMgrService) {}
}

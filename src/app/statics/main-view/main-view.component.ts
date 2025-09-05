import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ImagesBoxComponent } from '../../inputs/images-box/images-box.component';
import { TextAreaComponent } from '../../inputs/text-area/text-area.component';
import { FileBoxComponent } from '../../inputs/file-box/file-box.component';
import { RecordFinderComponent } from "../../mainPages/record-finder/record-finder.component";
import { AddFieldComponent } from "../../mainPages/add-field/add-field.component";
import { EditTemplateComponent } from "../../mainPages/edit-template/edit-template.component";
import { LoginPageComponent } from "../../mainPages/login-page/login-page.component";
import { SuperUserPanelComponent } from "../../mainPages/super-user-panel/super-user-panel.component";

@Component({
  selector: 'app-main-view',
  imports: [RecordFinderComponent, AddFieldComponent, EditTemplateComponent, LoginPageComponent, SuperUserPanelComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}

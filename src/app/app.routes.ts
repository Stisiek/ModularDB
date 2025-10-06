import { Routes } from '@angular/router';
import { AddFieldComponent } from './mainPages/add-field/add-field.component';
import { LoginPageComponent } from './mainPages/login-page/login-page.component';
import { RecordFinderComponent } from './mainPages/record-finder/record-finder.component';
import { SuperUserPanelComponent } from './mainPages/super-user-panel/super-user-panel.component';
import { EditTemplateComponent } from './mainPages/edit-template/edit-template.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { TilesPageComponent } from './statics/tiles-page/tiles-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tiles', pathMatch: 'full' },
    { path: 'tiles', component: TilesPageComponent, canActivate: [authGuard] },
    { path: 'fieldboxes', component: AddFieldComponent, canActivate: [authGuard, adminGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: 'search', component: RecordFinderComponent, canActivate: [authGuard] },
    { path: 'adminpanel', component: SuperUserPanelComponent, canActivate: [authGuard, adminGuard] },
    { path: 'templates', component: EditTemplateComponent, canActivate: [authGuard, adminGuard] },
];

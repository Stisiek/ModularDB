import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from '../../directives/match-password.directive';
import { SettingItemComponent } from "../superUserItems/setting-item/setting-item.component";
import { UserItemComponent } from "../superUserItems/user-item/user-item.component";
import { Client, User, UserInfoForSuperuserDto } from '../../api/steelService';
import { LoginMgrService } from '../../services/login-mgr.service';

@Component({
  selector: 'app-super-user-panel',
  imports: [FormsModule, SettingItemComponent, UserItemComponent, NgForOf],
  templateUrl: './super-user-panel.component.html',
  styleUrl: './super-user-panel.component.css'
})
export class SuperUserPanelComponent {
  password: string = '';
  newUserInfo = new User();

  settings = [
    { name: 'Ustawienie 1', value: true },
    { name: 'Ustawienie 2', value: false },
    { name: 'Ustawienie 3', value: true }
  ];

  users: UserInfoForSuperuserDto[] = [];

  constructor(private api: Client, private loginMgr: LoginMgrService) {}

  ngOnInit() {
    this.api.getAllUsersInfoForSuperuser(this.loginMgr.getToken() ?? '').then(users => {
      this.users = users;
    });
  }

  addEmployee() {
    this.loginMgr.encryptOnce('password123').then(encryptedPwd => {
      this.newUserInfo.password = encryptedPwd;
      this.api.createNewUser(this.loginMgr.getToken() ?? '', this.newUserInfo).then(() => {
        this.ngOnInit();
        this.newUserInfo = new User();
      });
    });
  }

  handleImportantChanges() {
    this.ngOnInit();
  }

  handleUserSelected(user: UserInfoForSuperuserDto) {
    this.newUserInfo.id = user.id;
    this.newUserInfo.name = user.name;
    this.newUserInfo.surname = user.surname;
    this.newUserInfo.permissions = user.permissionLevel!;
    this.newUserInfo.username = user.login!;

    console.log(this.newUserInfo);
  }

  resetNewUserInfo() {
    this.newUserInfo = new User();
  }

  saveSettings() {

  }
}

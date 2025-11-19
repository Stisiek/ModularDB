import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client, User, UserInfoForSuperuserDto } from '../../../api/steelService';
import { PermnissionsPipe } from "../../../pipes/permnissions.pipe";
import { LoginMgrService } from '../../../services/login-mgr.service';

@Component({
  selector: 'app-user-item',
  imports: [PermnissionsPipe],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  @Input() userData: UserInfoForSuperuserDto = {} as UserInfoForSuperuserDto;

  @Output() importantChangesDone: EventEmitter<void> = new EventEmitter<void>();
  @Output() userSelected: EventEmitter<UserInfoForSuperuserDto> = new EventEmitter<UserInfoForSuperuserDto>();

  constructor(private api: Client, private loginMgr: LoginMgrService) {}

  deactivateOrActivateUser(activate: boolean) {
    this.api.activateOrDeactivateUser(this.userData.id!, activate, this.loginMgr.getToken() ?? '').then(() => {
      this.importantChangesDone.emit();
    });
  }

  resetPassword() {
    // Implement password reset logic here
    // Do dodania na backu - isFirstLogin przy restarcie hasła
  }

  deleteUser() {
    this.api.deleteUser(this.userData.id!, this.loginMgr.getToken() ?? '').then(() => {
      this.importantChangesDone.emit();
    });
  }

  selectUser() {
    this.userSelected.emit(this.userData);
  }
}

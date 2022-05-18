import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatService, UserResponseDTO, UserService } from '../api';

@Component({
  selector: 'app-select-user-dialog',
  templateUrl: './select-user-dialog.component.html',
  styleUrls: ['./select-user-dialog.component.scss'],
})
export class SelectUserDialogComponent implements OnInit {
  users: UserResponseDTO[] = [];

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    public dialogRef: MatDialogRef<SelectUserDialogComponent>
  ) {}

  async ngOnInit() {
    this.users = await this.userService.usersControllerGetUsers().toPromise();
  }

  async selectUser(user: UserResponseDTO) {
    await this.chatService.chatControllerCreateConversation({ partnerId: user.id }).toPromise();
    this.dialogRef.close();
  }
}

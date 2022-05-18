import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ChatService,
  ConversationResponseDTO,
  DefaultService,
  UserResponseDTO,
} from '../api';
import { SelectUserDialogComponent } from '../select-user-dialog/select-user-dialog.component';
import { TokenService } from '../token-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  conversations: ConversationResponseDTO[] = [];
  ownUser?: UserResponseDTO;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private chatService: ChatService,
    private dialog: MatDialog,
    private defaultService: DefaultService
  ) {}

  ngOnInit(): void {
    if (!this.tokenService.getAccessToken()) {
      this.router.navigate(['']);
    } else {
      this.init();
    }
  }

  async init() {
    try {
      this.ownUser = await this.defaultService
        .appControllerGetAnyUser()
        .toPromise();
    } catch (e) {
      this.tokenService.setAccessToken(undefined);
      this.router.navigate(['']);
    }
    this.conversations = await this.chatService
      .chatControllerGetConversations()
      .toPromise();
  }

  getChatTitle(conversation: ConversationResponseDTO): string {
    const user = conversation.participants.find(
      (p) => p.id != this.ownUser?.id
    );
    return user?.username ?? '';
  }

  navigateToChat(conversation: ConversationResponseDTO) {
    this.router.navigate(['chat', conversation.id]);
  }

  async addConversation() {
    const dialogRef = this.dialog.open(SelectUserDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.init();
    });
  }

  logout(): void {
    this.tokenService.setAccessToken(undefined);
    this.router.navigate(['']);
  }
}

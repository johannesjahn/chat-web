import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChatService,
  ConversationResponseDTO,
  DefaultService,
  MessageResponseDTO,
  UserResponseDTO,
} from '../api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  conversationId?: number;
  input: string = '';
  ownUser?: UserResponseDTO;
  title: string = '';

  conversation?: ConversationResponseDTO;

  @ViewChild('messagesContainer') messagesContainer?: ElementRef;

  constructor(
    activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private defaultService: DefaultService
  ) {
    activatedRoute.params.subscribe((params) => {
      this.conversationId = params['id'];
    });
  }

  scrollToBottom(): void {
    try {
      console.log(this.messagesContainer!.nativeElement.scrollTop)
      console.log(this.messagesContainer?.nativeElement.scrollHeight)
      this.messagesContainer!.nativeElement.scrollTop =
        this.messagesContainer?.nativeElement.scrollHeight;
    } catch (err) {}
  }

  async ngOnInit() {
    this.defaultService
      .appControllerGetAnyUser()
      .toPromise()
      .then((u) => (this.ownUser = u));
    await this.init();
    this.title =
      this.conversation?.participants.find((u) => u.id != this.ownUser?.id)
        ?.username ?? '';
  }

  async init() {
    this.conversation = await this.chatService
      .chatControllerGetMessages({
        conversationId: this.conversationId ?? 0,
      })
      .toPromise();
    console.log(this.conversation);
  }

  back() {
    this.router.navigate(['main']);
  }

  async send() {
    if (!this.input) return;
    await this.chatService
      .chatControllerSendMessage({
        content: this.input,
        conversationId: this.conversationId!,
      })
      .toPromise();
    this.input = '';
    this.scrollToBottom();
    await this.init();
  }

  isOwnMessage(message: MessageResponseDTO): boolean {
    return message.author.id == this.ownUser?.id;
  }
}

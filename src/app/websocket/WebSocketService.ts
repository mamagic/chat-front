import { Injectable } from '@angular/core';
import { Client, over, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{
  private stompClient: Client = new Client();

  private messageSubject = new Subject<string>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const socket = new SockJS('/ws');
    this.stompClient = over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/broadcast-message', (message: Message) => {
        const receivedMessage = message.body;
        this.messageSubject.next(receivedMessage);
      });
    });
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}

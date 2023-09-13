import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebSocketService } from '../websocket/WebSocketService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy{
  messages: { text: string }[] = [];
  newMessage = '';

  constructor(private httpClient: HttpClient,
              private webSocketService: WebSocketService,
              private messageSubscription: Subscription){
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.httpClient.post(
          'http://localhost:8080/',
          this.newMessage,
          { headers:
            { 'Content-Type': 'text/plain;charset=UTF-8' }
          })
          .subscribe((response : any) => {
            console.log(response);

            if (response && response.text){
              this.messageSubscription = this.webSocketService.getMessageSubject().subscribe((message: string) => {
                      this.messages.push({ text: message });
                  });
            }
           },
          (error) => {
            console.error("send failed",error.message);
          });

      this.newMessage = '';
    }
  }

  ngOnDestroy() {
      this.messageSubscription.unsubscribe();
    }
}


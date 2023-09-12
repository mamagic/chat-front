import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { text: string }[] = [];
  newMessage = '';

  constructor(private httpClient: HttpClient) {
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage });
      this.httpClient.post(
          'http://localhost:8080/', this.newMessage,
                                    { headers: { 'Content-Type': 'text/plain;charset=UTF-8' }}
                                    )
          .subscribe(response => {
            console.log(response);
          },
          (error) => {
            console.error("send failed",error);
          });

      this.newMessage = '';
    }
  }
}


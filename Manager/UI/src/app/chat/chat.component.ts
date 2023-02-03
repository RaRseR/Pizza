import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  id!: string;
  messages: IMessage[] = [];
  newMessage!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      this.messages = [];
      this.newMessage = '';
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap) => {
      this.id = paramsMap.get('id')!;
    });

    return this.http
      .get<IMessage[]>('/api/chat/' + this.id)
      .subscribe((data) => {
        this.messages = data;
      });
  }
  sendMessage() {
    if (this.newMessage === '') {
      return;
    }
    this.messages.push({ from: true, text: this.newMessage });

    this.http
      .post<any>('/api/send-message', {
        id: this.id,
        text: this.newMessage,
      })
      .subscribe(() => {});

    this.newMessage = '';
  }
}

interface IMessage {
  from: boolean;
  text: string;
}

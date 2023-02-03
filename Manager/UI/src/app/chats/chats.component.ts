import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  chats: IChat[] = [];
  activeChat!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    return this.http.get<IChat[]>('/api/chat').subscribe((data) => {
      this.chats = data;
    });
  }
}

interface IChat {
  id: string;
  user: string;
}

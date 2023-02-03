import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { FormsModule } from '@angular/forms';
import { ChatsComponent } from './chats.component';
import { ChatComponent } from '../chat/chat.component';

@NgModule({
  declarations: [ChatsComponent, ChatComponent],
  imports: [CommonModule, ChatsRoutingModule, FormsModule],
})
export class ChatsModule {}

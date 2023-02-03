import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from '../chats/chats.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {
        path: ':id',
        component: ChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}

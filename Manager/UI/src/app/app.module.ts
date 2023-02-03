import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { OrdersComponent } from './orders/orders.component';
import { NavComponent } from './navbar/navbar.component';
import { OrderComponent } from './order/order.component';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { ChatComponent } from './chat/chat.component';
// import { ChatsComponent } from './chats/chats.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    OrdersComponent,
    NavComponent,
    OrderComponent,
    LoadingComponent,
    NotFoundComponent,
    // ChatComponent,
    // ChatsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

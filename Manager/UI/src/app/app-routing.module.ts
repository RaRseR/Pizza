import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { OrdersComponent } from './orders/orders.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  {
    path: 'chat',
    loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule)
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

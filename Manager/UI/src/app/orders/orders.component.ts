import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: IOrder[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    return this.http.get<IOrder[]>('/api/orders').subscribe((data) => {
      this.orders = data;
    });
  }
}

interface IOrder {
  _id: string;
  status: number;
  title: string;
  size: string;
  dough: string;
  border: string;
  address: string;
  supplements: string;
  comment: string;
  user: { id: string; name: string; team_id?: string };
}

import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() _id!: string;
  @Input() status!: number;
  @Input() title!: string;
  @Input() size!: string;
  @Input() dough!: string;
  @Input() border!: string;
  @Input() address!: string;
  @Input() supplements!: string;
  @Input() comment!: string;
  @Input() user!: { id: string; name: string; team_id?: string };

  constructor(private http: HttpClient) {}

  changeStatus(status: any) {
    this.http
      .post<any>(
        '/api/change-status',
        {
          id: this._id,
          status,
        },
      )
      .subscribe(() => {});
  }
}

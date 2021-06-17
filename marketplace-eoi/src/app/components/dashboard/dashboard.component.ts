import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/clases/article';
import { Order } from 'src/app/clases/order';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  articles: Article[] = [];
  orders: Order[] = [];
  logUser: User = new User();
  constructor(private router: Router, private restService: RestService) {}

  Usuarios() {
    return this.router.navigate(['/users']);
  }

  Articulos() {
    return this.router.navigate(['/articles']);
  }

  Pedidos() {
    return this.router.navigate(['/orders']);
  }

  ngOnInit(): void {
    this.logUser = this.restService.logUser;
    this.restService.getUsuarios().subscribe((users) => {
      this.users = users;
    });
    this.restService.getArticulos().subscribe((articles) => {
      this.articles = articles;
    });
    this.restService.getPedidos().subscribe((orders) => {
      this.orders = orders;
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { environment } from '../../environments/environment';
import { Article } from '../clases/article';
import { Order } from '../clases/order';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  users: User[] = [];
  logUser: User = new User();
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getUsuarios(): Observable<Array<User>> {
    return this.http
      .get<User[]>(`${environment.BACKEND_URL}/usuarios.json`)
      .pipe(
        map((users) => {
          const usersArray: User[] = [];
          for (const key in users) {
            if (Object.prototype.hasOwnProperty.call(users, key)) {
              const user = users[key];
              if (user.pedidos === undefined) {
                user.pedidos = [];
              }
              usersArray.push(user);
            }
          }
          return usersArray;
        })
      );
  }
  addUsuario(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.BACKEND_URL}/usuarios.json`,
      user,
      this.httpOptions
    );
  }
  updateUsuario(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.BACKEND_URL}/usuarios/${user.id}.json`,
      user,
      this.httpOptions
    );
  }
  deleteUsuario(id: string): Observable<{}> {
    return this.http.delete(
      `${environment.BACKEND_URL}/usuarios/${id}.json`,
      this.httpOptions
    );
  }

  getArticulos(): Observable<Array<Article>> {
    return this.http
      .get<Article[]>(`${environment.BACKEND_URL}/articulos.json`)
      .pipe(
        map((articles) => {
          const articlesArray: Article[] = [];
          for (const key in articles) {
            if (Object.prototype.hasOwnProperty.call(articles, key)) {
              const article = articles[key];
              articlesArray.push(article);
            }
          }
          return articlesArray;
        })
      );
  }

  addArticulo(articulo: Article): Observable<Article> {
    return this.http.post<Article>(
      `${environment.BACKEND_URL}/articulos.json`,
      articulo,
      this.httpOptions
    );
  }

  deleteArticulo(id: string): Observable<{}> {
    return this.http.delete(
      `${environment.BACKEND_URL}/articulos/${id}.json`,
      this.httpOptions
    );
  }

  updateArticulo(article: Article): Observable<Article> {
    return this.http.put<Article>(
      `${environment.BACKEND_URL}/articulos/${article.id}.json`,
      article,
      this.httpOptions
    );
  }
  getPedidos(): Observable<Array<Order>> {
    return this.http
      .get<Order[]>(`${environment.BACKEND_URL}/orders.json`)
      .pipe(
        map((orders) => {
          const ordersArray: Order[] = [];
          for (const key in orders) {
            if (Object.prototype.hasOwnProperty.call(orders, key)) {
              const article = orders[key];
              ordersArray.push(article);
            }
          }
          return ordersArray;
        })
      );
  }

  addPedido(pedido: Order): Observable<Order> {
    return this.http.post<Order>(
      `${environment.BACKEND_URL}/orders.json`,
      pedido,
      this.httpOptions
    );
  }
  deletePedido(id: string): Observable<{}> {
    return this.http.delete(
      `${environment.BACKEND_URL}/orders/${id}.json`,
      this.httpOptions
    );
  }
  updatePedido(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${environment.BACKEND_URL}/orders/${order.id}.json`,
      order,
      this.httpOptions
    );
  }
}

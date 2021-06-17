import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddedArticle } from 'src/app/clases/added-article';
import { Article } from 'src/app/clases/article';
import { Order } from 'src/app/clases/order';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  alertMostrado: boolean;
  alertMostradoError: boolean;
  alertMostraCantidad: boolean;
  alertMostraCestaVacia: boolean;
  form: FormGroup;
  totalNuevoPedido: number = 0;
  addedArticulos: AddedArticle[] = [];
  logUser: User = new User();
  articles: Article[] = [];
  users: User[] = [];
  nuevoPedido: Order = new Order();

  constructor(
    private dashboard: DashboardComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      buscarArticulo: [''],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  buscarArticulo() {
    this.articles = [];
    this.restService.getArticulos().subscribe((articles) => {
      articles.find((article) => {
        if (
          article.name
            .toLowerCase()
            .includes(this.form.value.buscarArticulo.toLowerCase())
        ) {
          this.articles.push(article);
        }
      });
    });
  }

  navigateOrder() {
    this.router.navigate(['orders'], {
      relativeTo: this.route.parent.parent,
    });
  }

  addArticulo(article: Article) {
    if (
      this.form.value.cantidad <= article.stock &&
      this.form.value.cantidad >= 1
    ) {
      let addedArticulo: AddedArticle = new AddedArticle();
      addedArticulo.nombre = article.name;
      addedArticulo.totalPrice = article.price * this.form.value.cantidad;
      addedArticulo.unidades = this.form.value.cantidad;
      this.totalNuevoPedido += addedArticulo.totalPrice;
      this.addedArticulos.push(addedArticulo);
    } else {
      this.alertMostraCantidad = true;
      setTimeout(() => (this.alertMostraCantidad = false), 2000);
    }
  }
  eliminarAddedArticulo(addedArticle: AddedArticle) {
    let index = this.addedArticulos.indexOf(addedArticle);
    this.addedArticulos.splice(index, 1);
  }
  guardarPedido() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 2000);
    } else {
      if (this.addedArticulos.length === 0) {
        this.alertMostraCestaVacia = true;
        setTimeout(() => (this.alertMostraCestaVacia = false), 2000);
      } else {
        this.nuevoPedido = <Order>{};
        this.nuevoPedido.name = this.form.value.nombre;
        this.nuevoPedido.date = this.form.value.fecha;
        this.nuevoPedido.articles = this.addedArticulos;
        this.nuevoPedido.totalPedido = this.totalNuevoPedido;
        this.restService.addPedido(this.nuevoPedido).subscribe((order) => {
          this.nuevoPedido.id = order.name;
          this.users.find((user) => {
            if (user.id === this.logUser.id) {
              if (user.pedidos === undefined) {
                user.pedidos = [];
              }
              user.pedidos.push(this.nuevoPedido);
              this.restService.updateUsuario(user).subscribe();
              this.restService.updatePedido(this.nuevoPedido).subscribe();
            }
          });

          this.dashboard.ngOnInit();
          this.articles.find((article) => {
            this.addedArticulos.find((addedArticle) => {
              if (article.name === addedArticle.nombre) {
                article.vecesPedido += addedArticle.unidades;
                article.stock -= addedArticle.unidades;
                this.restService.updateArticulo(article).subscribe();
              }
            });
          });
          this.addedArticulos = [];

          this.alertMostrado = true;
          setTimeout(() => (this.alertMostrado = false), 2000);
        });
      }
    }
  }

  ngOnInit(): void {
    this.alertMostrado = false;
    this.alertMostradoError = false;
    this.alertMostraCantidad = false;
    this.alertMostraCestaVacia = false;
    this.logUser = this.restService.logUser;
    this.restService.getUsuarios().subscribe((users) => (this.users = users));
    this.restService.getArticulos().subscribe((articles) => {
      this.articles = articles;
    });
  }
}

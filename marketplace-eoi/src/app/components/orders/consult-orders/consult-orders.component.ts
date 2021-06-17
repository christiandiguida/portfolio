import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddedArticle } from 'src/app/clases/added-article';
import { Article } from 'src/app/clases/article';
import { Order } from 'src/app/clases/order';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-consult-orders',
  templateUrl: './consult-orders.component.html',
  styleUrls: ['./consult-orders.component.css'],
})
export class ConsultOrdersComponent implements OnInit {
  alertMostrado: boolean;
  alertMostradoError: boolean;
  totalNuevoPedido: number = 0;
  actualizando: boolean = false;
  form: FormGroup;

  orders: Order[] = [];
  users: User[] = [];
  articles: Article[] = [];
  logUser: User = new User();
  pedidoActualizado: Order = new Order();
  addedArticulos: AddedArticle[] = [];
  articulosBuscados: Article[] = [];
  alertMostraCantidad: boolean;
  alertMostraCestaVacia: boolean;

  constructor(
    private dashboard: DashboardComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      buscarArticulo: [''],
      buscarPedido: [''],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: [''],
    });
  }
  buscarPedido() {
    this.orders = [];
    this.restService.getPedidos().subscribe((orders) => {
      orders.find((order) => {
        if (
          order.name
            .toLowerCase()
            .includes(this.form.value.buscarPedido.toLowerCase())
        ) {
          this.orders.push(order);
        }
      });
    });
  }

  navigateOrder() {
    this.router.navigate(['orders'], {
      relativeTo: this.route.parent.parent,
    });
  }

  actualizandoPedido(order: Order) {
    this.actualizando = true;
    this.pedidoActualizado = order;
    this.form.patchValue({
      nombre: this.pedidoActualizado.name,
      fecha: this.pedidoActualizado.date,
    });
  }

  eliminarAddedArticulo(addedArticle: AddedArticle) {
    this.pedidoActualizado.totalPedido -= addedArticle.totalPrice;
    let index = this.pedidoActualizado.articles.indexOf(addedArticle);
    this.pedidoActualizado.articles.splice(index, 1);
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

  addArticulo(articuloBuscado: Article) {
    if (
      this.form.value.cantidad <= articuloBuscado.stock &&
      this.form.value.cantidad >= 1
    ) {
      let addedArticulo: AddedArticle = new AddedArticle();
      addedArticulo.nombre = articuloBuscado.name;
      addedArticulo.totalPrice =
        articuloBuscado.price * this.form.value.cantidad;
      addedArticulo.unidades = this.form.value.cantidad;
      this.totalNuevoPedido += addedArticulo.totalPrice;
      this.pedidoActualizado.articles.push(addedArticulo);
    } else {
      this.alertMostraCantidad = true;
      setTimeout(() => (this.alertMostraCantidad = false), 2000);
    }
  }
  actualizarPedido() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 2000);
    } else {
      if (this.pedidoActualizado.articles.length === 0) {
        this.alertMostraCestaVacia = true;
        setTimeout(() => (this.alertMostraCestaVacia = false), 2000);
      } else {
        this.pedidoActualizado.name = this.form.value.nombre;
        this.pedidoActualizado.date = this.form.value.fecha;
        this.pedidoActualizado.totalPedido += this.totalNuevoPedido;
        this.restService
          .updatePedido(this.pedidoActualizado)
          .subscribe((order) => {
            this.users.find((user) => {
              if (user.id === this.logUser.id) {
                if (user.pedidos === undefined) {
                  user.pedidos = [];
                }
                let index = user.pedidos.indexOf(this.pedidoActualizado);
                user.pedidos.splice(index, 1);
                user.pedidos.push(this.pedidoActualizado);
                this.restService.updateUsuario(user).subscribe();
              }
            });
          });

        this.articles.find((article) => {
          this.pedidoActualizado.articles.find((addedArticle) => {
            if (article.name === addedArticle.nombre) {
              article.stock -= addedArticle.unidades;
              article.vecesPedido += addedArticle.unidades;
              this.restService.updateArticulo(article).subscribe();
            }
          });
        });
        this.addedArticulos = [];
        this.alertMostrado = true;
        setTimeout(() => (this.alertMostrado = false), 1500);
      }
    }
  }

  borrarPedido(order: Order) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      for (let i = 0; i < user.pedidos.length; i++) {
        const pedido = user.pedidos[i];
        if (pedido.id === order.id) {
          user.pedidos.splice(i, 1);
          let ind = this.orders.indexOf(order);
          this.orders.splice(ind, 1);
          this.restService.updateUsuario(user).subscribe();
          this.restService.deletePedido(order.id).subscribe(() => {
            this.dashboard.ngOnInit();
            this.alertMostrado = true;
            setTimeout(() => (this.alertMostrado = false), 2000);
          });
        }
      }
    }
  }

  ngOnInit(): void {
    this.alertMostrado = false;
    this.alertMostradoError = false;
    this.alertMostraCantidad = false;
    this.alertMostraCestaVacia = false;
    this.logUser = this.restService.logUser;
    this.restService.getPedidos().subscribe((orders) => {
      this.orders = orders;
    });
    this.restService.getUsuarios().subscribe((users) => (this.users = users));

    this.restService.getArticulos().subscribe((articles) => {
      this.articles = articles;
    });
  }
}

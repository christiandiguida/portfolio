import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/clases/article';
import { RestService } from 'src/app/servicios/rest.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-consult-articles',
  templateUrl: './consult-articles.component.html',
  styleUrls: ['./consult-articles.component.css'],
})
export class ConsultArticlesComponent implements OnInit {
  alertMostrado: boolean;
  alertMostradoError: boolean;
  articles: Article[] = [];
  form: FormGroup;
  actualizando: boolean = false;
  articuloActualizado: Article = new Article();

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
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }
  buscarArticulo() {
    this.articles = [];
    this.restService.getArticulos().subscribe((articulos) => {
      articulos.find((articulo) => {
        if (
          articulo.name
            .toLowerCase()
            .includes(this.form.value.buscarArticulo.toLowerCase())
        ) {
          this.articles.push(articulo);
        }
      });
    });
  }
  navigateArticle() {
    this.router.navigate(['articles'], {
      relativeTo: this.route.parent.parent,
    });
  }

  actualizandoArticulo(article: Article) {
    this.articuloActualizado = article;
    this.form.patchValue({
      nombre: this.articuloActualizado.name,
      precio: this.articuloActualizado.price,
      stock: this.articuloActualizado.stock,
    });
    this.actualizando = !this.actualizando;
  }

  actualizarArticulo() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 1500);
    } else {
      this.articuloActualizado.name = this.form.value.nombre;
      this.articuloActualizado.price = this.form.value.precio;
      this.articuloActualizado.stock = this.form.value.stock;
      this.restService
        .updateArticulo(this.articuloActualizado)
        .subscribe(() => {
          this.alertMostrado = true;
          setTimeout(() => (this.alertMostrado = false), 1500);
        });
    }
  }

  borrarArticulo(article: Article) {
    this.restService.deleteArticulo(article.id).subscribe(() => {
      let i = this.articles.indexOf(article);
      this.articles.splice(i, 1);
      this.alertMostrado = true;
      setTimeout(() => (this.alertMostrado = false), 1500);
      this.dashboard.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.alertMostrado = false;
    this.alertMostradoError = false;
    this.restService.getArticulos().subscribe((articles) => {
      this.articles = articles;
    });
  }
}

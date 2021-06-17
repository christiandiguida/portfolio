import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { Article } from '../../../clases/article';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit {
  alertMostrado: boolean;
  alertMostradoError: boolean;
  form: FormGroup;
  nuevoArticulo: Article = new Article();
  articles: Article[] = [];

  constructor(
    private dashboard: DashboardComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }
  registro() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 1500);
    } else {
      this.restService
        .addArticulo(this.nuevoArticulo)
        .subscribe((nuevoArticulo) => {
          this.nuevoArticulo = {
            id: nuevoArticulo.name,
            name: this.form.value.nombre,
            price: this.form.value.precio,
            stock: this.form.value.stock,
            vecesPedido: 0,
          };
          this.restService.updateArticulo(this.nuevoArticulo).subscribe();
          this.alertMostrado = true;
          setTimeout(() => (this.alertMostrado = false), 1500);
          this.dashboard.ngOnInit();
        });
    }
  }
  navigateArticle() {
    this.router.navigate(['articles'], {
      relativeTo: this.route.parent.parent,
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

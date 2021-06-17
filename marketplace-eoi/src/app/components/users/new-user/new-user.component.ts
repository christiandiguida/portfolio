import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  alertMostrado: boolean;
  alertMostradoError: boolean;
  users: User[] = [];
  nuevoUsuario: User = new User();
  form: FormGroup;

  constructor(
    private dashboard: DashboardComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  registro() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 2000);
    } else {
      this.alertMostrado = false;
      this.restService
        .addUsuario(this.nuevoUsuario)
        .subscribe((nuevoUsuario) => {
          this.nuevoUsuario = {
            id: nuevoUsuario.name,
            name: this.form.value.usuario,
            password: this.form.value.password,
            pedidos: [],
          };
          this.restService.updateUsuario(this.nuevoUsuario).subscribe();
          this.alertMostrado = true;
          this.dashboard.ngOnInit();
          setTimeout(() => (this.alertMostrado = false), 2000);
        });
    }
  }

  navigateUser() {
    this.router.navigate(['users'], {
      relativeTo: this.route.parent.parent,
    });
  }
  ngOnInit(): void {
    this.alertMostrado = false;
    this.alertMostradoError = false;
    this.restService.getUsuarios().subscribe((users) => (this.users = users));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-consult-users',
  templateUrl: './consult-users.component.html',
  styleUrls: ['./consult-users.component.css'],
})
export class ConsultUsersComponent implements OnInit {
  alertActualizarMostrado: boolean;
  alertMostrado: boolean;
  alertMostradoError: boolean;
  alertLogUserMostrado: boolean;
  actualizando: boolean;

  users: User[] = [];
  usuarioActualizado: User = new User();

  form: FormGroup;

  constructor(
    private dashboard: DashboardComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      buscarUsuario: [],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  buscarUsuario() {
    this.users = [];
    this.restService.getUsuarios().subscribe((usuarios) => {
      usuarios.find((usuario) => {
        if (
          usuario.name
            .toLowerCase()
            .includes(this.form.value.buscarUsuario.toLowerCase())
        ) {
          this.users.push(usuario);
        }
      });
    });
  }

  navigateUser() {
    this.router.navigate(['users'], {
      relativeTo: this.route.parent.parent,
    });
  }

  actualizandoUsuario(user: User) {
    this.form.patchValue({
      usuario: user.name,
    });
    this.usuarioActualizado = user;
    this.actualizando = !this.actualizando;
  }

  actualizarUsuario() {
    if (!this.form.valid) {
      this.alertMostradoError = true;
      setTimeout(() => (this.alertMostradoError = false), 2000);
    } else {
      this.usuarioActualizado.name = this.form.value.usuario;
      this.usuarioActualizado.password = this.form.value.password;
      this.restService.updateUsuario(this.usuarioActualizado).subscribe();
      if (this.usuarioActualizado.id === this.restService.logUser.id) {
        this.restService.logUser = this.usuarioActualizado;
      }
      this.alertActualizarMostrado = true;
      setTimeout(() => (this.alertActualizarMostrado = false), 2000);
      this.dashboard.ngOnInit();
    }
  }

  borrarUsuario(user: User) {
    if (user.id === this.restService.logUser.id) {
      this.alertLogUserMostrado = true;
      setTimeout(() => (this.alertLogUserMostrado = false), 2000);
    } else {
      this.restService.deleteUsuario(user.id).subscribe(() => {
        this.alertMostrado = true;
        setTimeout(() => (this.alertMostrado = false), 2000);
        let i = this.users.indexOf(user);
        this.users.splice(i, 1);
        this.dashboard.ngOnInit();
      });
    }
  }

  ngOnInit(): void {
    this.alertActualizarMostrado = false;
    this.alertLogUserMostrado = false;
    this.actualizando = false;
    this.alertMostrado = false;
    this.alertMostradoError = false;
    this.restService.getUsuarios().subscribe((users) => {
      this.users = users;
    });
  }
}

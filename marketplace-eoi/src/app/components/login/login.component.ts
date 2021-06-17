import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { RestService } from 'src/app/servicios/rest.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logUser: User = new User();
  form: FormGroup;
  users: User[] = [];
  logUsuario: User = new User();
  alertFormNotValid: boolean;
  alertUsuarioNoEncontrado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService
  ) {
    this.form = formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validacion() {
    if (!this.form.valid) {
      this.alertFormNotValid = true;
      setTimeout(() => (this.alertFormNotValid = false), 2000);
    } else {
      let usuarioEncontrado = this.users.find((user) => {
        if (
          user.name === this.form.value.usuario &&
          user.password === this.form.value.password
        ) {
          this.logUser = user;
          this.restService.logUser = this.logUser;
          this.router.navigate(['/dashboard']);
        }
      });
      if (!usuarioEncontrado) {
        this.alertUsuarioNoEncontrado = true;
        setTimeout(() => (this.alertUsuarioNoEncontrado = false), 2000);
      }
    }
  }

  ngOnInit(): void {
    this.alertFormNotValid = false;
    this.alertUsuarioNoEncontrado = false;
    this.restService.getUsuarios().subscribe((users) => (this.users = users));
  }
}

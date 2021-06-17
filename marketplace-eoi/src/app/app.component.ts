import { Component, OnInit } from '@angular/core';
import { RestService } from './servicios/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private restService: RestService, private router: Router) {}
  ngOnInit() {
    if (this.restService.logUser.id === undefined) {
      this.router.navigate(['']);
    }
  }
}

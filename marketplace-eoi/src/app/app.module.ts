import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { ConsultUsersComponent } from './components/users/consult-users/consult-users.component';
import { NewArticleComponent } from './components/articles/new-article/new-article.component';
import { ConsultArticlesComponent } from './components/articles/consult-articles/consult-articles.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { ConsultOrdersComponent } from './components/orders/consult-orders/consult-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    ArticlesComponent,
    OrdersComponent,
    NewUserComponent,
    ConsultUsersComponent,
    NewArticleComponent,
    ConsultArticlesComponent,
    NewOrderComponent,
    ConsultOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

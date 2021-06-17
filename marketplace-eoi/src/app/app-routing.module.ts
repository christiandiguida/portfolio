import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ConsultUsersComponent } from './components/users/consult-users/consult-users.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';
import { NewArticleComponent } from './components/articles/new-article/new-article.component';
import { ConsultArticlesComponent } from './components/articles/consult-articles/consult-articles.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { ConsultOrdersComponent } from './components/orders/consult-orders/consult-orders.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'new',
            component: NewUserComponent,
          },
          {
            path: 'consult',
            component: ConsultUsersComponent,
          },
        ],
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        children: [
          {
            path: 'new',
            component: NewArticleComponent,
          },
          {
            path: 'consult',
            component: ConsultArticlesComponent,
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          {
            path: 'new',
            component: NewOrderComponent,
          },
          {
            path: 'consult',
            component: ConsultOrdersComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

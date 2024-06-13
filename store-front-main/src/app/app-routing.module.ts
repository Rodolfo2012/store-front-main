import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/search', component: ProductSearchComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

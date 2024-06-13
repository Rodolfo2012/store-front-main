import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductCreateComponent,
    ProductSearchComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

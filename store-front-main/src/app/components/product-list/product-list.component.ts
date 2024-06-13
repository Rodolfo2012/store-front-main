import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  searchName: string = '';
  searchCategory: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   this.loadProducts();
  }

  loadProducts(): void {
    this.authService.getProducts().subscribe(data => {
      this.products = data;
    }, error => {
      console.error('Error fetching products', error);
    });
  }

  searchProducts(): void {
    this.authService.searchProducts(this.searchName, this.searchCategory).subscribe((products) => {
      this.products = products;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToCreateProduct() {
    this.router.navigate(['/products/create']);
  }

  deleteProduct(product: any) {
    this.authService.deleteProduct(product.id).subscribe(() => {
      this.fetchProducts();
    }, error => {
      console.error('Error deleting product', error);
    });
  }

  fetchProducts() {
    this.authService.getProducts().subscribe(data => {
      this.products = data;
    }, error => {
      console.error('Error fetching products', error);
    });
  }

}

import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  name: string = '';
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  searchProducts(): void {
    this.productService.searchProducts(this.name).subscribe(data => this.products = data);
  }
}

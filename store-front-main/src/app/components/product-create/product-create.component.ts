import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  categories: Category[] = [];
  product: Product = new Product();

  produtoForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0),
    category: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Error fetching categories', error);
    });
  }

  createProduct() {

    if(!this.produtoForm.valid){
      alert('Preencha todos os campos');
    }

    this.populaceDataProduct();

    this.authService.createProduct(this.product).subscribe(response => {
      this.router.navigate(['/products']);
    }, error => {
      console.error('Product creation failed', error);
    });
  }

  populaceDataProduct(){
    this.product.name = this.produtoForm.get('name')?.value;
    this.product.description = this.produtoForm.get('description')?.value;
    this.product.price = this.produtoForm.get('price')?.value;
    this.product.category = this.produtoForm.get('category')?.value;
  }

  goBack() {
    this.router.navigate(['/products']);
  }

}

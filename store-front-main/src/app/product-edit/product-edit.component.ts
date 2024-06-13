import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  id: number = 0;
  product: Product = new Product();
  categories: Category[] = [];

  produtoForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0),
    category: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getProductAndCategories();
  }

  getProductAndCategories(){
    this.id = this.route.snapshot.params['id'];
    this.authService.getProductById(this.id).subscribe(data => {
      this.product = data;

      this.authService.getCategories().subscribe(resp => {
        this.categories = resp;
        let category = resp.filter((item: any) => item.name === data.category.name);

        this.produtoForm.get('name')?.setValue(this.product.name);
        this.produtoForm.get('description')?.setValue(this.product.description);
        this.produtoForm.get('price')?.setValue(this.product.price);
        this.produtoForm.get('category')?.setValue(category[0]);
      })
    }, error => console.log(error));
  }

  onSubmit() {
    this.authService.updateProduct(this.id, this.produtoForm.value).subscribe(data => {
      this.router.navigate(['/products']);
    }, error => console.log(error));
  }

  goBack() {
    this.router.navigate(['/products']);
  }

}


import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  products: Product[] = [];

// add to cart

  cart: any[] = [];

addToCart(product: any): void {
  const item = this.cart.find(
    x => x.id === product.id
  );

  if (item) {
    item.quantity++;
  } else {
    this.cart.push({
      ...product,
      quantity: 1
    });
  }
}

RemoveToCart(product: any): void {
  const item = this.cart.find(
    x => x.id === product.id
  );

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.cart = this.cart.filter(
        x => x.id !== product.id
      );
    }
  }
}

getQuantity(product: any): number {
  const item = this.cart.find(
    x => x.id === product.id
  );

  return item ? item.quantity : 0;
}

  loading = true;
  errorMessage = '';

  constructor(private productService: ProductService,
    private cdr:ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe({

      next: (response) => {
        this.products = response.products;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = 'Products load nahi ho paye.';
        this.loading = false;
        this.cdr.detectChanges();
      }

    });

  }
}

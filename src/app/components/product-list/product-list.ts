
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

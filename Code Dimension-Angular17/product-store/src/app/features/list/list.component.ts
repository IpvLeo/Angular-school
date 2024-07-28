import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: any[] = [];

  productService = inject(ProductsService);
  router = inject(Router);

  ngOnInit () {
    this.productService.getAll().subscribe((products) => {
      this.products = products;

    });
  }
  
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }


}

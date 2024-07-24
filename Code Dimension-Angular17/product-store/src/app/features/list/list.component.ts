import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { Router, RouterModule } from '@angular/router';


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
  
  onEdit() {
    this.router.navigateByUrl('/edit-product');
  }


}

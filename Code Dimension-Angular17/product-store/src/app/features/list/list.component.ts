import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import {MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confimations-dialog',
  template: `<h2 mat-dialog-title>Deletar produto</h2>
  <mat-dialog-content>
   Tem certeza que quer deletar esse produto?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onNo()">Não</button>
    <button mat-raised-button color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);
end: "center"|"start"|"end"|undefined;

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

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
  matDialog = inject(MatDialog);
  
  ngOnInit () {
    this.productService.getAll().subscribe((products) => {
      this.products = products;

    });
  }
  
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

    onDelete(product: Product) {
      this.matDialog
        .open(ConfirmationDialogComponent)
        .afterClosed()
        .pipe(filter((answer) => answer === true))
        .subscribe(() => {
          this.productService.delete(product.id).subscribe(() => {
            this.productService.getAll().subscribe((products) => {
              this.products = products;
          });
        });
      });
    }
}

import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/services/product.service';
import {Product, products} from '../content/product.model';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmComponent} from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = products;

  constructor(private productService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items.map(item => ({...item, quantity: item.quantity + 1}));
    });
  }

  removeFromCart(product: Product) { // başka bir componentten erişilmek istendiğinde servise taşınabilir.
    const dialogRef = this.dialog.open(DeleteConfirmComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const index = this.cartItems.indexOf(product);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        }
      }
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (const product of this.cartItems) {
      total += parseFloat(product.price) * product.quantity;
    }
    return parseFloat(total.toFixed(2));
  }

  increaseQuantity(product: Product) {
    product.quantity++;
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      // Show an alert when trying to decrease quantity below 1
      alert('Quantity cannot be less than 1.');
    }
  }
  removeProduct(product: Product) {
    this.cartItems = this.cartItems.filter(item => item !== product);
  }
}

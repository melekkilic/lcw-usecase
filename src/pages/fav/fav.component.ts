import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/services/product.service';
import { Product, products } from '../content/product.model';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnDestroy {

  favoriteProducts: Product[] = [];
  private favoriteProductsSubscription: Subscription;



  constructor(private productService: ProductService,
    private dialog: MatDialog) {
      this.favoriteProductsSubscription = this.productService.favoriteProducts$.subscribe((favorites) => {
        this.favoriteProducts = favorites;
      });

    }
  
    ngOnInit() {

    }

    ngOnDestroy(): void {
      
    }
    toggleFavorite(product: Product) {
      if (product.isFavorite) {
        this.productService.removeFromFav(product.id);
      }
      else{
        this.productService.addToFav(product);
      }
      product.isFavorite = !product.isFavorite;
    }
}

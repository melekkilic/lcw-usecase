import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/services/search.service';
import { Product, products } from '../content/product.model';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnDestroy {

  favoriteProducts: Product[] = [];
  private favoriteProductsSubscription: Subscription;



  constructor(private searchService: SearchService,
    private dialog: MatDialog) {
      this.favoriteProductsSubscription = this.searchService.favoriteProducts$.subscribe((favorites) => {
        this.favoriteProducts = favorites;
      });

    }
  
    ngOnInit() {

    }

    ngOnDestroy(): void {
      
    }
    toggleFavorite(product: Product) {
      if (product.isFavorite) {
        this.searchService.removeFromFav(product.id);
      }
      else{
        this.searchService.addToFav(product);
      }
      product.isFavorite = !product.isFavorite;
    }
}

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/services/search.service';
import { Product,products } from './product.model';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnDestroy {
  private subscription: Subscription;

  constructor(private searchService: SearchService) {
    this.subscription = this.searchService.searchKeyword$.subscribe(keyword => {
      this.filterProductList(keyword);

    });

  }


isDropdownVisible:boolean=false;
selectedSortOption:any;
productListLength:number=0;
products: Product[] = products;
searchKeyword:string="";
ngOnDestroy() {
  // Component yok edildiğinde subscription'ı temizler.
  this.subscription.unsubscribe();
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
  isCardHovered: boolean = false;
  hoveredProduct: Product | undefined;

  onCardHover(product: Product) {
    this.isCardHovered = true;
    this.hoveredProduct = product;
  }

  onCardLeave() {
    this.isCardHovered = false;
    this.hoveredProduct = undefined;
  }

  sortControl(){
    this.isDropdownVisible = !this.isDropdownVisible;

  }

  sortProducts() {
    if (this.selectedSortOption === "ucuzdan-pahaliya") {
      // Ürünleri fiyatlarına göre küçükten büyüğe sırala
      this.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (this.selectedSortOption === "pahalidan-ucuza") {
      // Ürünleri fiyatlarına göre büyükten küçüğe sırala
      this.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
  }
  filterProductList(keyword: string) {
    const filteredProducts = this.searchService.getProductList().filter(product => {
      // Ürün adı içinde keyword var mı diye kontrol ediyor.
      return product.name.toLowerCase().includes(keyword.toLowerCase());
    });

    // Filtrelenmiş ürünleri productList'e atıyor.
    this.products = filteredProducts;
    
    this.productListLength=this.products.length;

    this.searchKeyword=keyword;


  }

  addToCart(product:any){
    this.searchService.addToCart(product);

  }

}

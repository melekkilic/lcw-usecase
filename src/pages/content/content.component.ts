import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from 'src/services/product.service';
import {Product, products} from './product.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnDestroy, OnInit {
  private subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.searchKeyword$.subscribe(keyword => {
      this.filterProductList(keyword);

    });

  }

  isDropdownVisible: boolean = false;
  selectedSortOption: any;
  productListLength: number = 0;
  products: Product[] = [];
  searchKeyword: string = "";
  allProductsLength: any;

  ngOnInit() {
    this.products=this.productService.getProductList();
    this.allProductsLength = this.products.length;
  }

  ngOnDestroy() {
    // Component yok edildiğinde subscription'ı temizler.
    this.subscription.unsubscribe();
  }

  toggleFavorite(product: Product) {
    if (product.isFavorite) {
      this.productService.removeFromFav(product.id);
    } else {
      this.productService.addToFav(product);
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

  sortControl() {
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
    const filteredProducts = this.productService.getProductList(keyword);
    // Filtrelenmiş ürünleri productList'e atıyor.
    this.products = filteredProducts;
    this.productListLength = this.products.length;
    this.searchKeyword = keyword;


  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product,products } from 'src/pages/content/product.model';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private searchKeywordSubject: Subject<string> = new Subject<string>();
    public searchKeyword$ = this.searchKeywordSubject.asObservable();
    private productList:  Product[] = products;
    private favoriteProducts: Product[] = [];
    private favoriteProductsSubject = new BehaviorSubject<Product[]>([]);
    favoriteProducts$ = this.favoriteProductsSubject.asObservable();




    private cartItemsSubject = new BehaviorSubject<any[]>([]);
    public cartItems$ = this.cartItemsSubject.asObservable();
    public cartItemsList :Product[]=products;

    constructor() {}

    search(keyword: string) {
        this.searchKeywordSubject.next(keyword);
    }


  getProductList(): Product[] {
    
    return this.productList;
  }


  addToCart(product: any) {
    const currentCartItems = this.cartItemsSubject.getValue();
    currentCartItems.push(product);
    this.cartItemsSubject.next(currentCartItems);
  }
  addToFav(product:any){
    const existingProduct = this.favoriteProducts.find((p) => p.id === product.id);
    if (!existingProduct) {
      this.favoriteProducts.push(product);
      this.favoriteProductsSubject.next(this.favoriteProducts);
    }
  }

  removeFromFav(productId: number) {
    this.favoriteProducts = this.favoriteProducts.filter((product) => product.id !== productId);
    this.favoriteProductsSubject.next(this.favoriteProducts);

  }

  getFavoriteProducts() {

    return this.favoriteProducts;

  }


}

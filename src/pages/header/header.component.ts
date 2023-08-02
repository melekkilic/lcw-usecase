import {Component, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from 'src/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private productService: ProductService,
              public router: Router
  ) {
  }

  searchValue: any;

  search() {
    this.searchValue = this.searchValue.toLowerCase().trim();

    if (this.searchValue.length >= 3) {
      this.productService.search(this.searchValue);
    }
  }

  getCard() {
    this.router.navigate(['/sepet']);
  }

  getFavorite() {
    this.router.navigate(['/fav'])
  }
}

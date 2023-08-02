import { Component ,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private searchService: SearchService,
    public router: Router
    ){}


  searchValue:any;
  filterProducts(searchTerm: string) {

  
  }

  search(){
    this.searchValue = this.searchValue.toLowerCase().trim();

    if(this.searchValue.length>=3){
      this.searchService.search(this.searchValue);
    }
  }

  getCard(){
    this.router.navigate(['/sepet']);

  }
  getFavorite(){
    this.router.navigate(['/fav'])
  }
}

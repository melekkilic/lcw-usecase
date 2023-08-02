import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/pages/cart/cart.component';
import { ContentComponent } from 'src/pages/content/content.component';
import { FavComponent } from 'src/pages/fav/fav.component';

const routes: Routes = [
  {path:'sepet',component:CartComponent},
  {path:'ürünler',component:ContentComponent},
  {path:'fav',component:FavComponent},
  {path:'',redirectTo:'/ürünler',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

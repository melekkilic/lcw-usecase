import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from 'src/pages/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ContentComponent } from 'src/pages/content/content.component';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import { CartComponent } from 'src/pages/cart/cart.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FavComponent } from 'src/pages/fav/fav.component';
import { FooterComponent } from 'src/pages/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {DeleteConfirmComponent} from "../pages/delete-confirm/delete-confirm.component";





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    CartComponent,
    FavComponent,
    FooterComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,


  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

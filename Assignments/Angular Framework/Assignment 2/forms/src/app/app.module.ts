import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';
import { AdvertisementTableComponent } from './advertisement-table/advertisement-table.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdvertisementDataService } from './advertisement-data.service';
import { SearchPipePipe } from './search-pipe.pipe';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementFormComponent,
    AdvertisementTableComponent,
    EditProductComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AdvertisementDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

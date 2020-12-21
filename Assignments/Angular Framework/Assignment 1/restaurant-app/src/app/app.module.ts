import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { UserComponent } from './user/user.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { FormsModule } from '@angular/forms';
import { DeleteRestaurantComponent } from './delete-restaurant/delete-restaurant.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';
import { RestaurantDataService } from './restaurant-data.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MenuComponent,
    RestaurantComponent,
    UserComponent,
    AddRestaurantComponent,
    DeleteRestaurantComponent,
    AddMenuComponent,
    DeleteMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'admin', component: AdminComponent},
      {path: 'menu', component: MenuComponent},
      {path: 'restaurant', component: RestaurantComponent},
      {path: 'user', component: UserComponent},
      { path: 'restaurant/:person', component:RestaurantComponent },
      { path: 'menu/:name', component:MenuComponent }
    ]),

  ],
  providers: [RestaurantDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

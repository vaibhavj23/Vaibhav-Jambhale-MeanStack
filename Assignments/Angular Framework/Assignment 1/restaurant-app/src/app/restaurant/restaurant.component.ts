import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ActivatedRoute } from '@angular/router';
import { RestaurantDataService } from '../restaurant-data.service';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private route: ActivatedRoute,private res_data:RestaurantDataService) { }
  public person="";
  public isAdmin=false;
  public restaurant_list=this.res_data.getData();
  display_add_restaurant = false;
  onAddPress() {
    this.display_add_restaurant = true;
   /*if you want the component to show and hide on click pressed, use 
   use this line
   this.display = !this.display;*/
 }

 display_delete_restaurant = false;
 onDeletePress() {
    this.display_delete_restaurant = true;
  /*if you want the component to show and hide on click pressed, use 
  use this line
  this.display = !this.display;*/
}
  
  addRestaurant(data){
    this.res_data.addRestaurant(data);
  }

  deleteRestaurant(data){
    this.res_data.deleteRestaurant(data);
  }
  ngOnInit(): void {
    this.person=this.route.snapshot.paramMap.get('person');
    this.res_data.checkAdmin(this.person);
    this.isAdmin=this.res_data.isAdmin;
  }

}


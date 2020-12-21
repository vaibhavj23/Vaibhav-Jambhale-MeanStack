import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantDataService } from '../restaurant-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isAdmin=false;
  public menu_list:any;
  public restaurant_name="";
  public restaurant_obj:any;
  constructor(private route: ActivatedRoute,private res_data:RestaurantDataService, private route1:Router) { }

  display_add_menu = false;
  onAddPress() {
    this.display_add_menu = true;
   /*if you want the component to show and hide on click pressed, use 
   use this line
   this.display = !this.display;*/
 }

 display_delete_menu = false;
 onDeletePress() {
    this.display_delete_menu = true;
  /*if you want the component to show and hide on click pressed, use 
  use this line
  this.display = !this.display;*/
}
 addMenu(data)
 {
  this.res_data.addMenu(this.restaurant_name,data);
 }
 deleteMenu(data)
 {
  this.res_data.deleteMenu(this.restaurant_name,data.menu_item);
 }

 sum=0;
 confirm=false;
 getSelectedItems(){
  this.sum = 0;
  let selectedItems = Array.from(document.querySelectorAll('.selectedItems'));
  for(let i of selectedItems){
    if((<HTMLInputElement>i).checked){
      this.sum += parseInt((<HTMLInputElement>i).value);
    }
  }
  this.confirm = true;
  console.log(this.sum);
 }

 orderSuccess(){
  alert("Order is Placed");
  this.route1.navigate(['/']);
}
orderFailed(){
  alert("Order is not Placed");
  this.route1.navigate(['/']);
}

  ngOnInit(): void {
    this.restaurant_name=this.route.snapshot.paramMap.get('name');
    this.menu_list=this.res_data.getMenu(this.restaurant_name);
    this.isAdmin=this.res_data.isAdmin;
    
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class Restaurant{
  name:string;
  menu: Menu[]=[];
  constructor(name,menu_obj)
  {
    this.name=name;
    this.menu.push(menu_obj)
  }
}

class Menu {
  item:string;
  price:number;
  constructor(item, price)
  {
    this.item = item;
    this.price = price
  }
}


export class RestaurantDataService  {

  constructor() { }

  res1=new Restaurant("Indian",new Menu("chicken",200));
  res2=new Restaurant("Dilbar",new Menu("Chinese",300));
  res3=new Restaurant("Taj",new Menu("Paneer",100));
  public restaurant_list=[this.res1,this.res2,this.res3];

  public getData(){
    return this.restaurant_list;
  }
  public addRestaurant(data){
    this.restaurant_list.push(new Restaurant(data,new Menu("",0)));
  }

  public deleteRestaurant(data){
    for(let restaurant of this.restaurant_list)
    {
      if(restaurant.name===data)
      {
        const index = this.restaurant_list.indexOf(restaurant);
        this.restaurant_list.splice(index,1);
        break;
      }
    }
  }
  

  public getMenu(restaurant_name)
  {
    for(let restaurant of this.restaurant_list)
    {
      if(restaurant.name==restaurant_name)
      {
        return restaurant.menu;
      }
    }
  }

  public addMenu(resName:any,menu_data){
    for(let restaurant of this.restaurant_list){
      if(restaurant.name==resName){
        restaurant.menu.push({item:menu_data.menu_item,price:menu_data.item_price});
      }
    }
  }

  public deleteMenu(resName:any,menu_item){
    for(let restaurant of this.restaurant_list){
      if(restaurant.name==resName){
        for(let k=0;k<restaurant.menu.length;k++){
          if(restaurant.menu[k].item==menu_item){
            restaurant.menu.splice(k,k+1);
          }
        }
      }
    }
  }

  public isAdmin=false;
  public checkAdmin(person:string){
    if(person=="admin"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }


}

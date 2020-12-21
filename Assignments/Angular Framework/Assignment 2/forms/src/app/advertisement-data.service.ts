import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementDataService {

  constructor(private http:HttpClient) { }
  
  public advertisement:any[]=[];

   a=this.http.get<any[]>("/assets/dummyData.json").subscribe(data =>{
    for(let d of data)
    {
      this.advertisement.push(d)
    }
    return 0;
  }); 
  getAllAdvertises()
  {
    return this.advertisement;
  }

  public deleteAdvertises(data)
  {
    for(let advertise of this.advertisement)
    {
      if(advertise.title==data.title)
      {
        const index = this.advertisement.indexOf(advertise);
        this.advertisement.splice(index,1);
      }
    }
  }

  public updateAdvertise(title,data){
    for(let advertise of this.advertisement)
    {
      if(advertise.title==title)
      {
        advertise.title=data.title;
        advertise.name=data.name;
        advertise.category=data.category;
        advertise.description=data.description;
      }
    }
  }
  
  public getAdvertise(title){
    for(let advertise of this.advertisement)
    {
      if(advertise.title==title)
      {
        return advertise;
      }
    }
  }
  
}

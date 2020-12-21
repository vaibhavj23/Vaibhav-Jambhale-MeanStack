import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdvertisementDataService } from '../advertisement-data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private dataService:AdvertisementDataService, private route:ActivatedRoute,private route1: Router) { }
  advertisement:any={
    title:"",
    name:"",
    category:"",
    description:""
  };

  category : string[] =['Furniture','Hardware','Mobile'];
  advertisementForm:FormGroup;
  advertiseTitle="";
  displayfrom(){
   this.advertisementForm=new FormGroup({
    title : new FormControl(this.advertisement.title),
    name : new FormControl(this.advertisement.name),
    category : new FormControl(this.advertisement.category),
    description : new FormControl(this.advertisement.description)
  })
  }
  
  onSubmit()
  {
  
    //alert(JSON.stringify(this.advertisementForm.value));
    this.dataService.updateAdvertise(this.advertiseTitle,this.advertisementForm.value);
    this.route1.navigate(['']);
    //this.advertisementEvent.emit(this.advertisement);
  }

  onCancel()
  {
    this.route1.navigate(['']);
  }
  
  ngOnInit(): void {
    this.advertiseTitle=this.route.snapshot.paramMap.get('title');
    this.advertisement=this.dataService.getAdvertise(this.advertiseTitle);
    //console.log(this.advertisement.name);
    
    this.displayfrom();

  }

}

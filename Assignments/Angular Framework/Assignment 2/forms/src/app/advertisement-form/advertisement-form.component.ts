import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AdvertisementDataService } from '../advertisement-data.service';
@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.css']
})
export class AdvertisementFormComponent implements OnInit {

  constructor(private dataService:AdvertisementDataService) { }
  //@Output() advertisementEvent:EventEmitter<any> = new EventEmitter();

  advertisement_name="Online Sale";
  categoryArr : string[] =['Furniture','Hardware','Mobile'];
  advertisementForm=new FormGroup({
    title : new FormControl('',[Validators.required]),
    name : new FormControl(this.advertisement_name,[Validators.required]),
    category : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  
  get title()
  {
    return this.advertisementForm.get('title');
  }
  
  get name()
  {
    return this.advertisementForm.get('name');
  }
  
  get category()
  {
    return this.advertisementForm.get('category');
  }
  
  get description()
  {
    return this.advertisementForm.get('description');
  }

  onSubmit()
  {
    //alert(JSON.stringify(this.advertisementForm.value));
    this.dataService.advertisement.push(this.advertisementForm.value);
    //this.advertisementEvent.emit(this.advertisement);
    alert("Form Submitted")
    this.advertisementForm.reset();
  }
  ngOnInit(): void {
  }

}

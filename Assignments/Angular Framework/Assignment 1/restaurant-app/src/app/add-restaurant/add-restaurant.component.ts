import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor() { }
  public restaurant_name="";
  @Output() restaurant_added: EventEmitter<string> =   new EventEmitter();

  onSubmit(data) {
    this.restaurant_added.emit(data.restaurant_name);
  }

  ngOnInit(): void {
  }

}

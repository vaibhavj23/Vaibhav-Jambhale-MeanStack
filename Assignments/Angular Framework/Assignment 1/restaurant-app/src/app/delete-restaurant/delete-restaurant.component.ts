import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.css']
})
export class DeleteRestaurantComponent implements OnInit {

  constructor() { }
  public restaurant_name="";
  @Output() restaurant_deleted: EventEmitter<string> =   new EventEmitter();

  onSubmit(data) {
    this.restaurant_deleted.emit(data.restaurant_name);
  }
  ngOnInit(): void {
  }

}

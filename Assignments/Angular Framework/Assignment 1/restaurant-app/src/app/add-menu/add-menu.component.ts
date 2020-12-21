import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor() { }
  @Output() menu_added: EventEmitter<string> =   new EventEmitter();

  @Input() isAdmin:boolean;
  onSubmit(data) {
    this.menu_added.emit(data);
  }
  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})
export class DeleteMenuComponent implements OnInit {

  constructor() { }
  @Output() menu_deleted: EventEmitter<string> =   new EventEmitter();
  @Input() isAdmin:boolean;
  onSubmit(data) {
      this.menu_deleted.emit(data);
  }
  ngOnInit(): void {
  }

}

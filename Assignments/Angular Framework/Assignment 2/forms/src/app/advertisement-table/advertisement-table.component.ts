import { Component, Input, OnInit } from '@angular/core';
import { AdvertisementDataService } from '../advertisement-data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-advertisement-table',
  templateUrl: './advertisement-table.component.html',
  styleUrls: ['./advertisement-table.component.css']
})
export class AdvertisementTableComponent implements OnInit {

  constructor(private dataService:AdvertisementDataService, private route: Router) { }
  //@Input() advertisementArray:any[];
  advertisementArray:any[];

  searchText : String = "";
  onDelete(data){
    this.dataService.deleteAdvertises(data);
  }

  onEdit(data)
  {
    //alert("in edit function");
    this.route.navigate(['/editAdvertise',data.title]);
    //alert("after edit function");
  }
  ngOnInit(): void {
    this.advertisementArray=this.dataService.getAllAdvertises();
  }

}

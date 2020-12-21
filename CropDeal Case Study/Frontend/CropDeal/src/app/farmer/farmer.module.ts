import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { FarmerHomeComponent } from './farmer-home/farmer-home.component';
import { FarmerProfileComponent } from './farmer-profile/farmer-profile.component';
import { PublishCropComponent } from './publish-crop/publish-crop.component';
import { ViewPublishedCropsComponent } from './view-published-crops/view-published-crops.component';
import { ViewSoldCropsComponent } from './view-sold-crops/view-sold-crops.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [FarmerHomeComponent, FarmerProfileComponent, PublishCropComponent, ViewPublishedCropsComponent, ViewSoldCropsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    FarmerHomeComponent,
    FarmerHomeComponent,
    PublishCropComponent,
    ViewPublishedCropsComponent,
    ViewSoldCropsComponent
  ]
})
export class FarmerModule { }

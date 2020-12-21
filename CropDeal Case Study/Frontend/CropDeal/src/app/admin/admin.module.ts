import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FarmerMngmtComponent } from './farmer-mngmt/farmer-mngmt.component';
import { DealerMngmtComponent } from './dealer-mngmt/dealer-mngmt.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminHomeComponent, FarmerMngmtComponent, DealerMngmtComponent, UserRatingComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AdminHomeComponent,
    FarmerMngmtComponent,
    DealerMngmtComponent,
    UserRatingComponent
  ]
})
export class AdminModule { }

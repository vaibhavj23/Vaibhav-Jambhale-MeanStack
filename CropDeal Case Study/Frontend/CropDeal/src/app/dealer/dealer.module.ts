import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { DealerHomeComponent } from './dealer-home/dealer-home.component';
import { DealerProfileComponent } from './dealer-profile/dealer-profile.component';
import { SubscribedCropsComponent } from './subscribed-crops/subscribed-crops.component';
import { ViewCropsComponent } from './view-crops/view-crops.component';
import { PurchasedCropsComponent } from './purchased-crops/purchased-crops.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DealerHomeComponent, DealerProfileComponent, SubscribedCropsComponent,
     ViewCropsComponent, PurchasedCropsComponent, NotificationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    DealerHomeComponent,
    DealerProfileComponent,
    SubscribedCropsComponent,
    ViewCropsComponent,
    PurchasedCropsComponent,
    NotificationsComponent
  ]
})
export class DealerModule { }

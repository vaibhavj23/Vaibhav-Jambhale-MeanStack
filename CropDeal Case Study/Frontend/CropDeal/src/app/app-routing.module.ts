import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DealerMngmtComponent } from './admin/dealer-mngmt/dealer-mngmt.component';
import { FarmerMngmtComponent } from './admin/farmer-mngmt/farmer-mngmt.component';
import { UserRatingComponent } from './admin/user-rating/user-rating.component';
import { DealerHomeComponent } from './dealer/dealer-home/dealer-home.component';
import { DealerProfileComponent } from './dealer/dealer-profile/dealer-profile.component';
import { NotificationsComponent } from './dealer/notifications/notifications.component';
import { PurchasedCropsComponent } from './dealer/purchased-crops/purchased-crops.component';
import { SubscribedCropsComponent } from './dealer/subscribed-crops/subscribed-crops.component';
import { ViewCropsComponent } from './dealer/view-crops/view-crops.component';
import { FarmerHomeComponent } from './farmer/farmer-home/farmer-home.component';
import { PublishCropComponent } from './farmer/publish-crop/publish-crop.component';
import { ViewPublishedCropsComponent } from './farmer/view-published-crops/view-published-crops.component';
import { ViewSoldCropsComponent } from './farmer/view-sold-crops/view-sold-crops.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'farmerHome', component: FarmerHomeComponent},
  {path: 'dealerHome', component: DealerHomeComponent},
  {path: 'adminHome', component: AdminHomeComponent},
  {path: 'viewFarmerProfile', component: FarmerHomeComponent},
  {path: 'publishCrop', component: PublishCropComponent},
  {path: 'viewPublishedCrops', component: ViewPublishedCropsComponent},
  {path: 'viewSoldCrops', component: ViewSoldCropsComponent},
  {path: 'viewDealerProfile', component: DealerProfileComponent},
  {path: 'viewSubscribedCrops', component: SubscribedCropsComponent},
  {path: 'viewCrops', component: ViewCropsComponent},
  {path: 'viewPurchasedCrops', component: PurchasedCropsComponent},
  {path: 'viewNotifications', component: NotificationsComponent},
  {path: 'viewFarmerMngmtPage', component: FarmerMngmtComponent},
  {path: 'viewDealerMngmtPage', component: DealerMngmtComponent},
  {path: 'viewUserRatingPage', component: UserRatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

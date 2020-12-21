import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule} from './home/home.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FarmerModule } from './farmer/farmer.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DealerModule } from './dealer/dealer.module';
import { AdminModule } from './admin/admin.module';
import { UserService } from './services/user.service';
import { CropService } from './services/crop.service';
import { WindowRefService } from './services/window-ref.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FarmerModule,
    DealerModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPageScrollModule,
    NgbModule
  ],
  providers: [
    AuthService,
    UserService,
    CropService,
    WindowRefService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

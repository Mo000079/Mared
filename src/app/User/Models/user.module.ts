import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../Components/Home/home.component";
import { CheckOutComponent } from "../Components/check-out/check-out.component";
import { ProductCardComponent } from "../Components/product-card/product-card.component";
import { UserComponent } from '../Components/user/user.component';
import { CustomerOfferDetailsComponent } from "../Components/customer-offer-details/customer-offer-details.component";
import { WalletComponent } from '../Components/wallet/wallet.component';
import { CartComponent } from "../Components/cart/cart.component";
import { FooterComponent } from "../Components/footer/footer.component";
import { NavBarComponent } from "../Components/nav-bar/nav-bar.component";
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
// import { ProductFilterComponent } from "../Components/product-filter/product-filter.component";
import { ProductsComponent } from '../Components/products/products.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { ProductFilterComponent } from "../Components/Products/products.component";
import { AuthGuard } from "src/app/Guard/auth-guard.guard";
import { WishlistComponent } from "../Components/wishlist/wishlist.component";
import { OfferCardComponent } from "../Components/offer-card/offer-card.component";
import { OrderHistoryComponent } from "../Components/order-history/order-history.component";
import { OfferFilterComponent } from "../Components/offer-filter/offer-filter.component";
import { NgxPaginationModule } from "ngx-pagination";

import { OfferCheckOutComponent } from '../Components/Offer-CheckOut/Offer-CheckOut.component';
import { UEmptyComponent } from '../Components/u-empty/u-empty.component';
import { ThanksPageComponent } from '../Components/Thanks-page/Thanks-page.component';
import { ContactUsComponent } from '../Components/contact-us/contact-us.component';
import { RatingComponent } from '../Components/rating/rating.component';
import { AboutUsComponent } from '../Components/About-us/about-us.component'

const routes: Routes = [

  {
    path: '', component: UserComponent, children:
      [
        { path: "", redirectTo: "home", pathMatch: "full" },
        { path: 'home', component: HomeComponent },
        { path: "checkout", component: CheckOutComponent, canActivate: [AuthGuard] },
        { path: "offercheckout/:id/:count", component: OfferCheckOutComponent, canActivate: [AuthGuard] },
        { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
        { path: "shop2/:catId/:Name", component: ProductsComponent },
        { path: "shop", component: ProductsComponent },
        { path: "item/:id", component: ProductDetailsComponent },
        { path: 'offerdetails/:id', component: CustomerOfferDetailsComponent },
        { path: 'offers', component: OfferFilterComponent },
        { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
        { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
        { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] },
        { path: 'contactus', component: ContactUsComponent},
        { path: 'thanks', component: ThanksPageComponent },
        { path: 'aboutus', component: AboutUsComponent },

      ]
  }
]
@NgModule({
  declarations: [

    CartComponent,
    CheckOutComponent,
    CustomerOfferDetailsComponent,
    FooterComponent,
    HomeComponent,
    NavBarComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    UserComponent,
    WalletComponent,
    RatingComponent,
    // ProductFilterComponent,
    ProductsComponent,
    OrderHistoryComponent,
    OfferCardComponent ,
    WishlistComponent ,
    OfferFilterComponent,
    UEmptyComponent,
    OfferCheckOutComponent,
    ContactUsComponent,
    ThanksPageComponent,
    AboutUsComponent

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    MdbRangeModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class UserModule {


}








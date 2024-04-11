import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authComponent } from './components/auth/auth.component';
import { ProductmanagementComponent } from './components/productmanagement/productmanagement.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { ConfirmationorderComponent } from './components/confirmationorder/confirmationorder.component';


export const routes: Routes = [
    {'path': '', component:HomeComponent},
    {'path': 'cart', component:CartComponent},
    {'path': 'shop', component:ShopComponent},
    {'path': 'auth', component:authComponent},
    {'path': 'checkout', component:CheckoutComponent},
    {'path': 'notfound', component:NotfoundComponent},
    {'path': 'ProductsDash', component:ProductmanagementComponent, canActivate: [AuthGuardService]},
    {'path': 'confirmationcheckout', component:ConfirmationorderComponent}];

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authComponent } from './components/auth/auth.component';
import { UserService } from './Services/user.service';
import { ProductService } from './Services/product.service';
import { ProductmanagementComponent } from './components/productmanagement/productmanagement.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,FooterComponent,NavbarComponent,authComponent,ProductmanagementComponent],
  imports: [
    FormsModule,ReactiveFormsModule
    ,BrowserModule,CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

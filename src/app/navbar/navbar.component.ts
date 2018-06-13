import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import ShoppingCart from '../models/shopping-cart';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(public userService: UserService, private router: Router, private cartService: ShoppingCartService) {
    this.cart = localStorage.getItem('cart') ? new ShoppingCart([]) : new ShoppingCart(JSON.parse(localStorage.getItem('cart')));
  }

  async ngOnInit() {
    this.subscription = this.userService.userEvents
      .switchMap(user => user ?
        Observable.of(user) :
        Observable.of(null)
      )
      .subscribe((user: User) => this.user = user);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout(this.user)
      .subscribe(() => {
        localStorage.removeItem('token');
        this.user = null;
      });
    // this.router.navigate(['/']);
  }

}

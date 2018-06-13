import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import ShoppingCart from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  filteredProducts = [];
  products = [];
  page = 1;
  category;
  shoppingCart = new ShoppingCart([]);

  constructor(private productsService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.categoria === this.category) : this.products;
  }

  private populateProducts() {
    this.productsService.getAll()
      .switchMap((res: any) =>  {
        this.products = res.products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }
}

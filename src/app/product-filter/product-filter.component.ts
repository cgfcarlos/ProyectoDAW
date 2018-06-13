import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  filteredProducts = [];
  categories = [];
  @Input() category;
  products = [];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(res => {
        if (!res.error) {
          this.categories = res.categories;
        }
      });
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.categoriaid === this.category) : this.products;
    });
  }

}

import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  imports: [],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
  addToBasket = output<Product>();

  handleClick() {
    this.addToBasket.emit(this.product());
  }
}

import { computed, Service, signal } from '@angular/core';
import { BasketItem } from '../components/basket-item';

@Service()
export class BasketService {
  private _items = signal<BasketItem[]>([]);
  items = this._items.asReadonly();
  total = computed<number>(() => this._items().reduce((total, item) => total + item.price, 0));

  addItem(item: BasketItem) {
    this._items.update((items) => [...items, item]);
  }
}

import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BasketItem } from '../components/basket-item';

@Service()
export class BasketService {
  private _httpClient = inject(HttpClient);

  private _items = signal<BasketItem[]>([]);
  items = this._items.asReadonly();
  total = computed<number>(() => this._items().reduce((total, item) => total + item.price, 0));

  addItem(productId: string): Observable<BasketItem> {
    return this._httpClient
      .post<BasketItem>('http://localhost:8081/api/basket', { productId })
      .pipe(tap((item) => this._items.update((items) => [...items, item])));
  }

  fatchBasket(): Observable<BasketItem[]> {
    return this._httpClient
      .get<BasketItem[]>('http://localhost:8081/api/basket')
      .pipe(tap((items) => this._items.set(items)));
  }
}

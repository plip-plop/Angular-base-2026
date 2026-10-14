import { computed, inject, Service, signal } from '@angular/core';
import { Product } from '../components/product';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class CatalogService {
  private _httpClient = inject(HttpClient);
  private _products = signal<Product[]>([]);
  products = this._products.asReadonly();
  hasProductsInStock = computed<boolean>(() => this._products().some(({ stock }) => stock > 0));

  decreaseStock(productId: string) {
    this._products.update((products) =>
      products.map((produit) => {
        if (produit.id === productId) {
          produit.stock--;
        }
        return produit;
      }),
    );
  }

  fetchProducts(): Observable<Product[]> {
    return this._httpClient
      .get<Product[]>('http://localhost:8081/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }
}

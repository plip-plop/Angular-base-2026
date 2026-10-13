import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Product } from './components/product';
import { ProductCard } from './components/product-card/product-card';
import { Menu } from './components/menu/menu';
import { CatalogService } from './services/catalog-service';
import { BasketService } from './services/basket-service';

@Component({
  imports: [ProductCard, Menu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private _catalogService = inject(CatalogService);
  private _basketService = inject(BasketService);

  isHovered = false;
  total = this._basketService.total;
  products = this._catalogService.products;
  hasProductsInStock = this._catalogService.hasProductsInStock;

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }

  ajouterPanier({price, title, id}: Product) {
    this._basketService.addItem({id, price, title});
    this._catalogService.decreaseStock(id);
  }
}

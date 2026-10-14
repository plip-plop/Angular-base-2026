import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Menu } from './components/menu/menu';
import { Product } from './components/product';
import { ProductCard } from './components/product-card/product-card';
import { BasketService } from './services/basket-service';
import { CatalogService } from './services/catalog-service';

@Component({
  imports: [ProductCard, Menu, CurrencyPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private _catalogService = inject(CatalogService);
  private _basketService = inject(BasketService);

  isHovered = false;
  total = this._basketService.total;
  products = this._catalogService.products;
  hasProductsInStock = this._catalogService.hasProductsInStock;

  ngOnInit(): void {
    this._catalogService.fetchProducts().subscribe();
  }

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }

  ajouterPanier({ id }: Product) {
    this._basketService.addItem(id).subscribe();
    this._catalogService.decreaseStock(id);
  }
}

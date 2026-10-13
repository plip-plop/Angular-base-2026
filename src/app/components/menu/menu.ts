import { Component, computed, inject } from '@angular/core';
import { BasketService } from '../../services/basket-service';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
    private _basketService = inject(BasketService);

    numberOfItems = computed(() => this._basketService.items().length);

}

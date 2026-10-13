import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Product } from './components/product';
import { ProductCard } from './components/product-card/product-card';
import { Menu } from './components/menu/menu';

@Component({
  imports: [ProductCard, Menu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  isHovered = false;
  total = signal<number>(0);
  products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);

  hasProductsInStock = computed<boolean>(() => this.products().some(({ stock }) => stock > 0));

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }

  ajouterPanier(product: Product) {
    this.total.update((val) => (val += product.price));

    this.products.update((products) =>
      products.map((produit) => {
        if (produit.id === product.id) {
          produit.stock--;
        }
        return produit;
      }),
    );
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.componentRef.setInput('product', {
      id: 'id',
      title: 'TITLE',
      description: 'DESC',
      photo: 'photo',
      price: 10,
      stock: 1,
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    const image = nativeElement.querySelector('img');
    expect(image?.src).toContain('photo');
  });

  it('should display the product description', () => {
    const small = nativeElement.querySelector('small');
    expect(small?.textContent).toContain('DESC');
  });

  it('should display the product title', () => {
    const cardLink = nativeElement.querySelector('.card-link');
    expect(cardLink?.textContent).toContain(component.product().title);
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    // Given
    const spyOnEmit = vi.spyOn(component.addToBasket, 'emit');
    const button = nativeElement.querySelector('button');

    // When
    button!.click();

    // Then
    expect(spyOnEmit).toHaveBeenCalledExactlyOnceWith(component.product());
  });
});

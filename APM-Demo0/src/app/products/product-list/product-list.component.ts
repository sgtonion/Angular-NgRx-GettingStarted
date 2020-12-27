import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  // sub: Subscription;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.store.dispatch(ProductActions.loadProducts());

    this.products$ = this.store.select(getProducts);

    this.displayCode$ = this.store.select(getShowProductCode);
      
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toogleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({
      currentProductId: product.id
    }))
  }

}

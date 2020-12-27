import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

    constructor(
        private action$: Actions,
        private productService: ProductService
    ){}

    loadProducts$ = createEffect(() => {
        return this.action$
            .pipe(
                ofType(ProductActions.loadProducts),
                mergeMap(() => this.productService
                    .getProducts()
                    .pipe(
                        map(products => ProductActions.loadProductsSuccess({product: products})),
                        catchError(err => of(ProductActions.loadProductsFailure({error: err})))
                ))
            )
    })

}
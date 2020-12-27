import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { merge, of } from "rxjs";
import { catchError, concatMap, map, mergeMap, tap } from "rxjs/operators";
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
    });

    updateProduct$ = createEffect(() => {
        return this.action$
            .pipe(
                ofType(ProductActions.updateProduct),
                concatMap(action => 
                    this
                        .productService
                        .updateProduct(action.product)
                        .pipe(
                            map(product => ProductActions.updateProductSuccess({product: product})),
                            catchError(error => of(ProductActions.updateProductFailure({error: error})))
                        )
            ))
    });

    deleteProduct$ = createEffect(() => {
        return this.action$
            .pipe(
                ofType(ProductActions.deleteProduct),
                mergeMap(action => {
                    return this.productService
                        .deleteProduct(action.product.id)
                        .pipe(
                            //tap(p => console.log("Product deleted is ", action.product.id)),
                            map(p => {
                                console.log(action.product.id);
                                return ProductActions.deleteProductSuccess({productId:action.product.id})
                            }),
                            catchError(err => of(ProductActions.deleteProductFailure({error:err})))
                        )
                })
            )
    })
}
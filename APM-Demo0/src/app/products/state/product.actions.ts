import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toogleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{product: Product}>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    "[Product] Initialize Current Product"
);

export const loadProducts = createAction(
    '[Product] Load'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{product: Product[]}>()
);

export const loadProductsFailure = createAction(
    '[Product] Load Failure',
    props<{error: string}>()
);
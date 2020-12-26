import { state } from "@angular/animations";
import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "../../state/app.state"

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: false,
    currentProduct: null,
    products: []
}

//Serialization of consts matter 
// Ln25 => Selects the "product" feature from Store
// Ln26 => Selects the specified state from the product feature
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    })
);